import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function MarkerInfo({ selectedMarker, setSelectedMarker, markers, setMarkers, userId, onClose }) {
  if (!selectedMarker.info) {
    return;
  }

  async function handleDeleteSchedule() {
    try {
      const documentRef = doc(db, userId, selectedMarker.info.date);
      const dataToRemove = { [selectedMarker.info.title]: deleteField() };
      await updateDoc(documentRef, dataToRemove);
      // db에서는 지워줬음. 이제 markers를 바꿔줘야함
      // const filteredMarkersarray = markers.filter((element) => element.info.title !== marker.info.title);
      setMarkers((markers) => {
        return markers.filter((element) => element.info.title !== selectedMarker.info.title);
      });
    } catch (error) {
      console.log(error);
    }
    setSelectedMarker(false);
    console.log(markers);
  }

  const from = `${selectedMarker.info.time.from.slice(0, 2)}시 ${selectedMarker.info.time.from.slice(3, 5)}분`;
  const until = `${selectedMarker.info.time.until.slice(0, 2)}시 ${selectedMarker.info.time.until.slice(3, 5)}분`;

  return (
    <div className='marker-info'>
      <p>제목: {selectedMarker.info.title}</p>
      <p>내용: {selectedMarker.info.detail}</p>
      <p>날짜: {selectedMarker.info.date}</p>
      <p>
        시간: {from} ~ {until}
      </p>
      <div className='marker-info-closeDelete'>
        <button onClick={onClose}>닫기</button>
        <button onClick={handleDeleteSchedule}>삭제</button>
      </div>
    </div>
  );
}

export default MarkerInfo;
