import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Map.css';

// onCreateMarker는 handleCreateMarker() 함수가 전달된 것으로 폼 정보만 인자로 넣기
function CreateMarkerForm({ onCreateMarker }) {
  const [dateValue, setDateValue] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isStartSelected, setIsStartSelected] = useState(false);
  const [isMorningSelected, setIsMorningSelected] = useState(true);

  function handleTimeButtonClick(time) {
    if (!isStartSelected) {
      setStartTime(time);
      setIsStartSelected(true);
    } else {
      if (moment(time, 'HH:mm').isAfter(moment(startTime, 'HH:mm'))) {
        setEndTime(time);
      } else {
        setStartTime(time);
        setEndTime(startTime);
      }
      setIsStartSelected(false);
    }
  }

  function generateTimeButtons() {
    const timeButtons = [];
    for (let hour = isMorningSelected ? 0 : 12; hour < (isMorningSelected ? 12 : 24); hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = moment({ hour, minute }).format('HH:mm');
        timeButtons.push(
          <button
            className={`times ${startTime === time || endTime === time ? 'selected' : ''}`}
            id={time}
            key={time}
            onClick={() => handleTimeButtonClick(time)}
          >
            {time}
          </button>
        );
      }
    }
    return timeButtons;
  }

  function handleToggleMorning() {
    setIsMorningSelected(!isMorningSelected);
  }

  function handleSubmitForm(ev) {
    ev.preventDefault();

    if (startTime && endTime && ev.target.elements.title.value && ev.target.elements.detail.value) {
      const newMarkerData = {
        title: ev.target.elements.title.value,
        detail: ev.target.elements.detail.value,
        date: moment(dateValue).format('YYYY년 MM월 DD일'),
        time: {
          from: startTime,
          until: endTime,
        },
      };
      onCreateMarker(newMarkerData);
    }
  }

  return (
    <form className='create-marker-form' onSubmit={handleSubmitForm}>
      <div>
        <Calendar
          onChange={setDateValue}
          value={dateValue}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
        />
      </div>
      <button className='toggle-am' onClick={handleToggleMorning}>
        {!isMorningSelected ? '오후' : '오전'}
      </button>
      <div className='time-box'>{generateTimeButtons()}</div>
      <div className='title-box'>
        <label htmlFor='title'>Title : </label>
        <input type='text' id='title' name='title' />
      </div>
      <div className='detail-box'>
        <label htmlFor='detail'>Detail : </label>
        <input type='text' id='detail' name='detail' />
      </div>
      <button className='submit' type='submit'>
        제출
      </button>
    </form>
  );
}

export default CreateMarkerForm;
