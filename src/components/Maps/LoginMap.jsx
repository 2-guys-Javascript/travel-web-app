import { useState, useCallback, memo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import CreateMarkerForm from './CreateMarkerForm';
import MarkerInfo from './MarkerInfo';
import moment from 'moment';
import { db } from '../../../firebaseConfig';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import './Map.css';

const center = { lat: 37.49, lng: 127.02 };

const myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off', // 전체 꺼주기
      },
    ],
  },
];

const libraries = ['places'];

function LoginMap({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  // 현재 위치를 받아올 상태
  const [userLocation, setUserLocation] = useState(null);
  // 마커를 만드는 중인지
  const [creatingMarker, setCreatingMarker] = useState(false);
  // 저장된 마커의 정보를 보여줄 마커
  const [selectedMarker, setSelectedMarker] = useState(null);
  // 현재 날짜를 나타낼 상태에 해당합니다. 이는 useEffect의 의존성으로 사용되어 바뀌면 새로운 데이터를 불러오게 합니다. 시작은 현재 날짜
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY년 MM월 DD일'));

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    region: 'kr',
    language: 'ko',
    version: 'quarterly',
    libraries,
  });

  const onLoad = useCallback(
    function callback(map) {
      setMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // center의 좌표를 현재 위치로
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
        });
      }
    },
    [userLocation]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // 지도를 클릭했을 때, 이미 마커일정 생성 중이었으면 사라지고, 아니면 markers에 일단 추가
  const handleMapClick = (event) => {
    if (creatingMarker) {
      if (markers.length > 0) {
        setMarkers(markers.slice(0, markers.length - 1));
      }
      setCreatingMarker(false);
    } else {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const newMarker = {
        id: lat,
        position: {
          lat: lat,
          lng: lng,
        },
      };

      setCreatingMarker(true);
      setMarkers([...markers, newMarker]);

      if (map) {
        map.panTo(newMarker.position);
      }
    }
    // 마커 정보 표시 안함
    setSelectedMarker(null);
  };

  // CreateMarkerForm 컴포넌트에 전달되며 새로운 마커를 보여줌
  const handleCreateMarker = (newMarkerInfo) => {
    const lat = markers[markers.length - 1].position.lat;
    const lng = markers[markers.length - 1].position.lng;

    const newMarker = {
      id: lat,
      position: { lat, lng },
      info: { ...newMarkerInfo },
    };

    const savingObject = {};
    savingObject[newMarker.info.title] = newMarker;

    setMarkers([...markers.slice(0, markers.length - 1), newMarker]);

    async function pushIntoDataBase() {
      try {
        const documentRef = doc(db, userId, newMarker.info.date);
        const documentSnapShot = await getDoc(documentRef);
        if (documentSnapShot.exists()) {
          await updateDoc(documentRef, savingObject);
        } else {
          await setDoc(documentRef, savingObject);
        }
      } catch (error) {
        console.log(error);
      }
    }

    pushIntoDataBase();
    setCreatingMarker(false);
  };

  // 무슨 이유에서인지 모르겠으나, 일정 생성하고, 처음 해당 마커를 눌러보면 selectedMarker는 null임
  // 따라서 바로 쓰려면 selectedMarker가 아니라, 그냥 marker를 사용하는 것이 필요함
  const handleMarkerClick = (marker) => {
    if (creatingMarker) {
      // 생성 중인 마커를 클릭하면 해당 마커를 삭제
      if (markers.length > 0) {
        setMarkers(markers.slice(0, markers.length - 1));
      }
      setCreatingMarker(false);
    }
    setSelectedMarker({ ...marker });
    map.panTo(marker.position);
    console.log(marker);
  };

  const handleDateChange = (ev) => {
    setSelectedDate(moment(ev.target.value).format('YYYY년 MM월 DD일'));
  };

  // handleMapClick 함수의 처음 조건에 걸리지 않게 creatingMarker를 false로 만들어줬어요
  useEffect(() => {
    setMarkers([]);
    setCreatingMarker(false);
    const fetchMarkersData = async () => {
      try {
        const documentRef = doc(db, userId, selectedDate);
        const snapShot = await getDoc(documentRef);
        const fetchedDocument = snapShot.data();
        const markerArray = [];
        for (const myKey in fetchedDocument) {
          markerArray.push(fetchedDocument[myKey]);
        }
        setMarkers(markerArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarkersData();
  }, [selectedDate]);

  return isLoaded ? (
    <div className='map-display'>
      <div>지도화면입니다</div>
      <div>
        <input type='date' className='login-date' onChange={handleDateChange} />
      </div>
      <GoogleMap
        mapContainerClassName='map-container'
        center={userLocation || center}
        onLoad={onLoad}
        zoom={16}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, styles: myStyles }}
        onClick={(event) => handleMapClick(event)}
      >
        {markers.map((marker) => (
          <MarkerF
            key={marker.id}
            position={marker.position}
            onClick={() => handleMarkerClick(marker)}
            // label={(index + 1).toString()} // 마커에 숫자 레이블 추가
          />
        ))}
      </GoogleMap>
      {creatingMarker && (
        <CreateMarkerForm
          markers={markers}
          selectedDate={selectedDate}
          onCreateMarker={handleCreateMarker}
          userId={userId}
        />
      )}
      {selectedMarker && <MarkerInfo marker={selectedMarker} onClose={() => setSelectedMarker(null)} />}
    </div>
  ) : (
    <div></div>
  );
}

export default memo(LoginMap);
