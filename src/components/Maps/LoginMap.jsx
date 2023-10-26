import { useState, useCallback, memo, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete, InfoWindow } from '@react-google-maps/api';
import CreateMarkerForm from './CreateMarkerForm';
import MarkerInfo from './MarkerInfo';
import moment from 'moment';
import { db } from '../../../firebaseConfig';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import './Map.css';
import './LoginMap.css';

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
  const [userLocation, setUserLocation] = useState({ lat: 37.49, lng: 127.02 });
  // 마커를 만드는 중인지
  const [creatingMarker, setCreatingMarker] = useState(false);
  // 저장된 마커의 정보를 보여줄 마커
  const [selectedMarker, setSelectedMarker] = useState(null);
  // 현재 날짜를 나타낼 상태에 해당합니다. 이는 useEffect의 의존성으로 사용되어 바뀌면 새로운 데이터를 불러오게 합니다. 시작은 현재 날짜
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY년 MM월 DD일'));
  const [getCafe, setGetCafe] = useState([]);
  const [getRestaurants, setGetRestaurants] = useState([]);
  const [selectedNearByPlace, SetSelectedNearByPlace] = useState(null);

  const inputRef = useRef();

  const restaurantMarkerIcon = {
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Frestaurant-icon-png&psig=AOvVaw3dK8tD1vqX4A3JhwaRAAQ4&ust=1698342896236000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJD397vikYIDFQAAAAAdAAAAABAE',
    scaledSize: new window.google.maps.Size(40, 40),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 40),
  };

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

  // 사용자가 선택한 마커가 바뀌면 해당 마커 일정이 나타나도록 해줬어요
  useEffect(() => {
    if (selectedMarker === null) {
      setGetRestaurants([]);
      setGetCafe([]);
      return;
    }

    if (selectedMarker.info === undefined) {
      setGetCafe([]);
      setGetRestaurants([]);
      setSelectedMarker(false);
      return;
    }

    const search = new google.maps.places.PlacesService(map);
    const restaurantRequest = {
      location: new google.maps.LatLng(selectedMarker.position.lat, selectedMarker.position.lng),
      radius: 500,
      type: 'restaurant',
      rankBy: google.maps.places.RankBy.PROMINENCE,
    };

    search.nearbySearch(restaurantRequest, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        const restaurant = results.filter((result) => result.types.indexOf('restaurant') === 0);
        console.log(restaurant);
        setGetRestaurants(restaurant);
      } else {
        console.error('This is an error :', status);
      }
    });

    const cafeRequest = {
      location: new google.maps.LatLng(selectedMarker.position.lat, selectedMarker.position.lng),
      radius: 500,
      type: 'cafe',
      rankBy: google.maps.places.RankBy.PROMINENCE,
    };
    search.nearbySearch(cafeRequest, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        const cafe = results.filter((result) => result.types.indexOf('cafe') === 0);
        console.log(cafe);
        setGetCafe(cafe);
      } else {
        console.error('This is an error :', status);
      }
    });
  }, [selectedMarker]);

  async function handleSearch() {
    const place = inputRef.current.value;
    const placesService = new window.google.maps.places.PlacesService(map);

    placesService.findPlaceFromQuery(
      {
        query: place,
        fields: ['geometry'],
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if (results && results.length > 0) {
            const location = results[0].geometry.location;
            const newCenter = {
              lat: location.lat(),
              lng: location.lng(),
            };
            map.panTo(newCenter, { behavior: 'smooth' });

            const isMarkerExist = markers.some(
              (marker) => marker.position.lat === newCenter.lat && marker.position.lng === newCenter.lng
            );

            if (!isMarkerExist) {
              const newMarker = {
                id: newCenter.lat,
                position: newCenter,
              };

              if (creatingMarker) {
                setMarkers([...markers.slice(0, markers.length - 1), newMarker]);
              } else {
                setCreatingMarker(true);
                setMarkers([...markers, newMarker]);
              }
            }
          }
        }
      }
    );
  }

  return isLoaded ? (
    <div className='map-display'>
      <div className='map-container'>
        <GoogleMap
          mapContainerClassName='map-container'
          center={userLocation}
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

          {getRestaurants.map((result, index) => (
            <MarkerF
              key={result.place_id}
              position={result.geometry.location}
              title={result.name}
              zIndex={getRestaurants.length - index}
              onClick={() => {
                SetSelectedNearByPlace(result);
              }}
            />
          ))}
          {getCafe.map((result, index) => (
            <MarkerF
              key={result.place_id}
              position={result.geometry.location}
              title={result.name}
              zIndex={getCafe.length - index}
              onClick={() => {
                SetSelectedNearByPlace(result);
              }}
            />
          ))}
          {selectedNearByPlace && (
            <InfoWindow
              position={selectedNearByPlace.geometry.location}
              onCloseClick={() => SetSelectedNearByPlace(null)}
            >
              <div>{selectedNearByPlace.name}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <button className='btn-1' onClick={() => map.panTo(userLocation, { behavior: 'smooth' })}>
        내 위치로
      </button>
      <Autocomplete>
        <input className='search-input' type='text' placeholder='어디로 갈까요?' ref={inputRef} />
      </Autocomplete>
      <button className='btn-2' onClick={handleSearch}>
        🚀
      </button>
      <input
        type='text'
        className='login-date'
        onChange={handleDateChange}
        onFocus={(e) => (e.target.type = 'date')}
        onBlur={(e) => (e.target.type = 'text')}
        placeholder='날짜를 입력해주세요'
      />
      {creatingMarker && (
        <CreateMarkerForm
          markers={markers}
          selectedDate={selectedDate}
          onCreateMarker={handleCreateMarker}
          userId={userId}
        />
      )}
      {selectedMarker && (
        <MarkerInfo
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          markers={markers}
          setMarkers={setMarkers}
          userId={userId}
          onClose={() => setSelectedMarker(null)}
        />
      )}
      {!selectedMarker && !creatingMarker && (
        <ul className='marker-info-list'>
          {markers.map(
            (marker) =>
              marker.info && (
                <li key={marker.info.id}>
                  <p>장소 : {marker.info.title}</p>
                  <p>메모 : {marker.info.detail}</p>
                  <p>
                    시간 : {marker.info.time.from} ~ {marker.info.time.until}
                  </p>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  ) : (
    <div></div>
  );
}

export default memo(LoginMap);
