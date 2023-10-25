function MarkerInfo({ marker, onClose }) {
  if (!marker.info) {
    return;
  }

  const from = `${marker.info.time.from.slice(0, 2)}시 ${marker.info.time.from.slice(3, 5)}분`;
  const until = `${marker.info.time.until.slice(0, 2)}시 ${marker.info.time.until.slice(3, 5)}분`;

  return (
    <div className='marker-info'>
      <p>제목: {marker.info.title}</p>
      <p>내용: {marker.info.detail}</p>
      <p>날짜: {marker.info.date}</p>
      <p>
        시간: {from} ~ {until}
      </p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default MarkerInfo;
