function MarkerInfo({ marker, onClose }) {
  const date = `${marker.info.date.slice(0, 4)}년 ${marker.info.date.slice(5, 7)}월 ${marker.info.date.slice(8, 10)}일`;
  const from = `${marker.info.time.from.slice(0, 2)}시 ${marker.info.time.from.slice(3, 5)}분`;
  const until = `${marker.info.time.until.slice(0, 2)}시 ${marker.info.time.until.slice(3, 5)}분`;

  return (
    <div className='marker-info'>
      <h2>마커 정보</h2>
      <p>제목: {marker.info.title}</p>
      <p>내용: {marker.info.content}</p>
      <p>날짜: {date}</p>
      <p>
        시간: {from} ~ {until}
      </p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default MarkerInfo;
