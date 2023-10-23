import { useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import './Map.css';

const center = {
  lat: -3.745,
  lng: -38.523,
};

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

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    region: 'kr',
    language: 'ko',
    version: 'quarterly',
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const newMarker = {
      lat: lat,
      lng: lng,
    };

    setMarkers([...markers, newMarker]);
    // 원하는 작업 수행
    // 예: 마커를 추가하거나 위치를 기록
  };

  return isLoaded ? (
    <>
      <div>This is Blank</div>
      <GoogleMap
        mapContainerClassName='map-container'
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, styles: myStyles }}
        onClick={(event) => handleMapClick(event)}
      >
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={marker}
            // label={(index + 1).toString()} // 마커에 숫자 레이블 추가
          />
        ))}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default memo(NonLoginMap);
