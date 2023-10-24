function PlaceInfo({ place, onClose }) {
  return (
    <div>
      <h2>{place.name}</h2>

      <p>
        {place.opening_hours !== undefined
          ? place.opening_hours.open_now
            ? '열었어요'
            : '닫혔어요'
          : '입력된 정보가 없어요'}
      </p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default PlaceInfo;
