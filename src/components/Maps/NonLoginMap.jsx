import { useState, useCallback, memo, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete, MarkerF } from '@react-google-maps/api';
import PlaceInfo from './PlaceInfo';
import './NonLoginMap.css';

const myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off', // 옵션 전체 꺼주기
      },
    ],
  },
];

const libraries = ['places'];

function NonLoginMap() {
  const [userLocation, setUserLocation] = useState({ lat: 37.58, lng: 126.98 });
  const [map, setMap] = useState(null);
  const [getCafe, setGetCafe] = useState([]);
  const [getRestaurants, setGetRestaurants] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [cafeButton, setCafeButton] = useState(true);
  const [restaurantsButton, setRestaurantsButton] = useState(false);
  const [openInfo, setOpenInfo] = useState({});

  const inputRef = useRef();
  const mapContainerRef = useRef();

  function onMapLoad(map) {
    mapContainerRef.current.style.position = 'fixed';
  }

  useEffect(() => {
    if (isLoaded) {
      onMapLoad();
    }
  }, []);

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

  async function handleSearch() {
    setIsSearch(true);
    const place = inputRef.current.value;

    // PlacesService를 사용하여 장소 정보 가져오기
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

            // 지도의 중심을 검색된 장소의 좌표로 이동 (부드럽게)
            map.panTo(newCenter, { behavior: 'smooth' });
            placesService.nearbySearch(
              {
                location: newCenter,
                radius: 500,
                type: 'restaurant',
                rankBy: google.maps.places.RankBy.PROMINENCE,
                language: 'ko',
              },
              (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  const restaurant = results.filter((result) => result.types.indexOf('restaurant') === 0);

                  setGetRestaurants(restaurant);
                }
              }
            );
            placesService.nearbySearch(
              {
                location: newCenter,
                radius: 500,
                type: 'cafe',
                rankBy: google.maps.places.RankBy.PROMINENCE,
                language: 'ko',
              },
              (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  const cafe = results.filter((result) => result.types.includes('cafe'));

                  setGetCafe(cafe);
                }
              }
            );
          }
        }
      }
    );
  }

  function handleCafeCategory() {
    setCafeButton(true);
    setRestaurantsButton(false);
  }

  function handleRestaurantsCategory() {
    setCafeButton(false);
    setRestaurantsButton(true);
  }

  // 마커나 일정 클릭 했을 때 정보 가져오기
  function handleSelectedPlace(result) {
    const isOpen = openInfo[result.place_id];
    setOpenInfo({ ...openInfo, [result.place_id]: !isOpen });

    // 마커를 클릭했을 때, 클릭된 마커의 정보를 리스트 맨 위로 올립니다.
    if (!isOpen) {
      if (cafeButton) {
        const updatedCafe = getCafe.filter((place) => place.place_id !== result.place_id);
        setGetCafe([result, ...updatedCafe]);
      } else {
        const updatedRestaurants = getRestaurants.filter((place) => place.place_id !== result.place_id);
        setGetRestaurants([result, ...updatedRestaurants]);
      }
    }

    map.panTo(result.geometry.location, { behavior: 'smooth' });
  }

  return isLoaded ? (
    <div className='map-display'>
      <div ref={mapContainerRef} className='map-container'>
        <GoogleMap
          mapContainerClassName='map-container'
          center={userLocation}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ disableDefaultUI: true, styles: myStyles }}
        >
          <MarkerF
            position={userLocation}
            icon={{ url: 'assets/non.png', scaledSize: new window.google.maps.Size(40, 40) }}
          />
          {cafeButton
            ? getCafe.map((result) => (
                <MarkerF
                  key={result.place_id}
                  position={result.geometry.location}
                  title={result.name}
                  onClick={() => handleSelectedPlace(result)}
                  icon={{
                    url: 'assets/coffee.png',
                    scaledSize: new window.google.maps.Size(38, 38),
                  }}
                />
              ))
            : getRestaurants.map((result) => (
                <MarkerF
                  key={result.place_id}
                  position={result.geometry.location}
                  title={result.name}
                  onClick={() => handleSelectedPlace(result)}
                  icon={{
                    url: 'assets/restaurant.png',
                    scaledSize: new window.google.maps.Size(38, 38),
                  }}
                />
              ))}
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
      {!isSearch ? (
        <div></div>
      ) : (
        <div className='non-btn-box'>
          <div className={`button ${restaurantsButton ? 'active' : ''}`} onClick={handleRestaurantsCategory}>
            음식점
          </div>
          <div className={`button ${cafeButton ? 'active' : ''}`} onClick={handleCafeCategory}>
            카페
          </div>
        </div>
      )}
      <ul className='non-ul'>
        {cafeButton
          ? getCafe.map((result) => (
              <li key={result.place_id}>
                {result.photos && result.photos.length > 0 ? (
                  <div>
                    <div className='non-list' onClick={() => handleSelectedPlace(result)}>
                      <img src={result.photos[0].getUrl()} />
                      <h2>{result.name}</h2>
                    </div>
                    {openInfo[result.place_id] && <PlaceInfo place={result} />}
                  </div>
                ) : (
                  <div>
                    <div className='non-list' onClick={() => handleSelectedPlace(result)}>
                      <div className='non-img'>등록된 사진이 없어요 😢</div>
                      <h2>{result.name}</h2>
                    </div>
                    {openInfo[result.place_id] && <PlaceInfo place={result} />}
                  </div>
                )}
              </li>
            ))
          : getRestaurants.map((result) => (
              <li key={result.place_id}>
                {result.photos && result.photos.length > 0 ? (
                  <div>
                    <div className='non-list' onClick={() => handleSelectedPlace(result)}>
                      <img
                        src={result.photos[0].getUrl({
                          maxWidth: 150,
                        })}
                      />
                      <h2>{result.name}</h2>
                    </div>
                    {openInfo[result.place_id] && <PlaceInfo place={result} />}
                  </div>
                ) : (
                  <div>
                    <div className='non-list' onClick={() => handleSelectedPlace(result)}>
                      <div className='non-img'>등록된 사진이 없어요 😢</div>
                      <h2>{result.name}</h2>
                    </div>
                    {openInfo[result.place_id] && <PlaceInfo place={result} />}
                  </div>
                )}
              </li>
            ))}
      </ul>
    </div>
  ) : (
    <div></div>
  );
}

export default memo(NonLoginMap);
