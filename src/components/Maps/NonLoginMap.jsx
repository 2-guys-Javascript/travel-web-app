import { useState, useCallback, memo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow, InfoWindowF } from '@react-google-maps/api';
import CreateMarkerForm from './CreateMarkerForm';
import MarkerInfo from './MarkerInfo';
import './Map.css';

let center = { lat: 37.49, lng: 127.02 };

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

function NonLoginMap() {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // 현재 위치를 받아올 상태
  const [creatingMarker, setCreatingMarker] = useState(false); // 마커를 만드는 중인지
  const [selectedMarker, setSelectedMarker] = useState(null); // 저장된 마커의 정보를 보여줄 마커

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    region: 'kr',
    language: 'ko',
    version: 'quarterly',
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
        console.log(newMarker);
      }
    }
    // 마커 정보 표시 안함
    setSelectedMarker(null);
  };

  const handleCreateMarker = (newMarkerInfo) => {
    const lat = markers[markers.length - 1].position.lat;
    const lng = markers[markers.length - 1].position.lng;

    const newMarker = {
      id: lat,
      position: { lat, lng },
      info: { ...newMarkerInfo },
    };

    setMarkers([...markers.slice(0, markers.length - 1), newMarker]);
    setCreatingMarker(false);
  };

  const handleMarkerClick = (marker) => {
    if (creatingMarker) {
      // 생성 중인 마커를 클릭하면 해당 마커를 삭제
      if (markers.length > 0) {
        setMarkers(markers.slice(0, markers.length - 1));
      }
      setCreatingMarker(false);
    }
    setSelectedMarker(marker);
    map.panTo(marker.position);
    console.log(marker);
  };

  return isLoaded ? (
    <div className='map-display'>
      <div>지도화면입니다</div>
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
      {creatingMarker && <CreateMarkerForm onCreateMarker={handleCreateMarker} />}
      {selectedMarker && <MarkerInfo marker={selectedMarker} onClose={() => setSelectedMarker(null)} />}
    </div>
  ) : (
    <div></div>
  );
}

export default memo(NonLoginMap);
