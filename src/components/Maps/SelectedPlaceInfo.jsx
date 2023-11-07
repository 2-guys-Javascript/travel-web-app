function SelectedPlaceInfo({ place }) {
  let isOpenMessage = '';

  if (place.opening_hours) {
    isOpenMessage = place.opening_hours.open_now ? '열었어요' : '닫혔어요';
  } else {
    isOpenMessage = '입력된 정보가 없어요';
  }

  return (
    <div>
      <div className='selected-marker-info'>
        <h2>{place.name}</h2>
        <p>{place.vicinity}</p>
      </div>
      <div className='selected-marker-info-open'>
        <p className={isOpenMessage}> {isOpenMessage}</p>
      </div>
    </div>
  );
}

export default SelectedPlaceInfo;
