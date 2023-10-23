import { useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import './Map.css';

const center = { lat: 37.58, lng: 126.98 };

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

  return isLoaded ? (
    <>
      <div>This is Blank</div>
      <GoogleMap
        mapContainerClassName='map-container'
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, styles: myStyles }}
      ></GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default memo(NonLoginMap);
