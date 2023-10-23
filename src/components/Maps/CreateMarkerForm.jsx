import React, { useState } from 'react';

function CreateMarkerForm({ onCreateMarker }) {
  const [newMarkerInfo, setNewMarkerInfo] = useState({
    title: '',
    content: '',
    date: '',
    time: {
      from: '',
      until: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('_')) {
      // 객체 내부의 필드 업데이트
      const [objName, fieldName] = name.split('_');
      setNewMarkerInfo({
        ...newMarkerInfo,
        [objName]: { ...newMarkerInfo[objName], [fieldName]: value },
      });
    } else {
      // 일반적인 필드 업데이트
      setNewMarkerInfo({ ...newMarkerInfo, [name]: value });
    }
  };

  const handleCreateMarker = () => {
    onCreateMarker(newMarkerInfo);
    setNewMarkerInfo({ title: '', content: '', date: '', time: { from: '', until: '' } });
  };

  return (
    <div className='create-marker-form'>
      <div>
        제목
        <input type='text' name='title' placeholder='제목' value={newMarkerInfo.title} onChange={handleInputChange} />
      </div>
      <div>
        내용
        <input
          type='text'
          name='content'
          placeholder='내용'
          value={newMarkerInfo.content}
          onChange={handleInputChange}
        />
      </div>
      <div>
        날짜
        <input type='date' name='date' placeholder='날짜' value={newMarkerInfo.date} onChange={handleInputChange} />
      </div>
      <div>
        시간
        <input type='time' name='time_from' value={newMarkerInfo.time.from} onChange={handleInputChange} step='3600' />
        <input
          type='time'
          name='time_until'
          value={newMarkerInfo.time.until}
          onChange={handleInputChange}
          step='3600'
        />
      </div>
      <button onClick={handleCreateMarker}>마커 생성</button>
    </div>
  );
}

export default CreateMarkerForm;
