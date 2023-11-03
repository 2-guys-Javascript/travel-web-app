import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function MarkerInfo({ selectedMarker, setSelectedMarker, markers, setMarkers, userId, onClose }) {
  if (!selectedMarker.info) {
    return;
  }

  async function handleDeleteSchedule() {
    try {
      const documentRef = doc(db, 'users', userId, 'date', selectedMarker.info.date);
      const dataToRemove = { [selectedMarker.info.title]: deleteField() };
      await updateDoc(documentRef, dataToRemove);
      // db에서는 지워줬음. 이제 markers를 바꿔줘야함 : 애플리케이션에서의 상태와 DB 간의 동기화
      setMarkers((markers) => {
        return markers.filter((element) => element.info.title !== selectedMarker.info.title);
      });
    } catch (error) {
      console.log(error);
    }
    setSelectedMarker(false);
  }

  const from = `${selectedMarker.info.time.from.slice(0, 2)}시 ${selectedMarker.info.time.from.slice(3, 5)}분`;
  const until = `${selectedMarker.info.time.until.slice(0, 2)}시 ${selectedMarker.info.time.until.slice(3, 5)}분`;

  return (
    <div className='marker-info'>
      <div className='info-wrapper'>
        <div className='info-div'>
          <p>제목</p>
          <div> {selectedMarker.info.title}</div>
          <p>내용</p>
          <div> {selectedMarker.info.detail} </div>
        </div>
        <div className='info-div'>
          <p>날짜</p>
          <div> {selectedMarker.info.date} </div>
          <p>시간</p>
          <div>
            {' '}
            {from} ~ {until}{' '}
          </div>
        </div>
      </div>
      <div className='marker-info-closeDelete'>
        <button onClick={onClose}>닫기</button>
        <button onClick={handleDeleteSchedule}>삭제</button>
      </div>
    </div>
  );
}

export default MarkerInfo;
