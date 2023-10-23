import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Map.css';

// onCreateMarker는 handleCreateMarker() 함수가 전달된 것으로 폼 정보만 인자로 넣기
function CreateMarkerForm({ onCreateMarker }) {
  const [dateValue, setDateValue] = useState(new Date());

  function handleSubmitForm(ev) {
    ev.preventDefault();
    const newMarkerData = {
      title: ev.target.elements.title.value,
      detail: ev.target.elements.detail.value,
      date: moment(dateValue).format('YYYY년 MM월 DD일'),
      time: {
        from: ev.target.elements.startTime.value,
        until: ev.target.elements.endTime.value,
      },
    };
    onCreateMarker(newMarkerData);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        <label htmlFor='title'>Title : </label>
        <input type='text' id='title' name='title' />
      </div>
      <div>
        <label htmlFor='detail'>Detail : </label>
        <input type='text' id='detail' name='detail' />
      </div>
      <div>
        <Calendar
          onChange={setDateValue}
          value={dateValue}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
        />
      </div>
      <div>
        <label htmlFor='startTime'>Start Time : </label>
        <input type='time' id='startTime' name='startTime' />
      </div>
      <div>
        <label htmlFor='endTime'>End Time : </label>
        <input type='time' id='endTime' name='endTime' />
      </div>
      <button type='submit'>제출</button>
    </form>
  );
}

export default CreateMarkerForm;
