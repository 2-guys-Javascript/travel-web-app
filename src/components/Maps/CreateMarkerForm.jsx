import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Map.css';

// onCreateMarker는 handleCreateMarker() 함수가 전달된 것으로 폼 정보만 인자로 넣기
function CreateMarkerForm({ onCreateMarker, markers, selectedDate }) {
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
        // 종료 시간이 시작 시간보다 이전이면 에러 처리
        // 여기에서는 시작 시간을 변경하고 종료 시간을 초기화합니다.
        setStartTime(time);
        setEndTime('');
        setIsStartSelected(true);
      }
    }

    if (startTime === time) {
      setStartTime('');
      setIsStartSelected(false);
    }
    if (endTime === time) {
      setEndTime('');
      setIsStartSelected(true);
    }
  }

  function generateTimeButtons() {
    const timeButtons = [];
    for (let hour = isMorningSelected ? 0 : 12; hour < (isMorningSelected ? 12 : 24); hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = moment({ hour, minute }).format('HH:mm');
        const isDisabled =
          (isStartSelected && endTime !== '' && (time <= startTime || time <= endTime)) ||
          (!isStartSelected && startTime !== '' && time <= startTime) ||
          isTimeSlotBooked(selectedDate, time); // 이미 저장된 일정 중에 해당 시간대가 선택되어 있는지 확인

        timeButtons.push(
          <button
            className={`times ${isDisabled ? 'disabled' : ''} ${
              (startTime === time && isStartSelected) || (endTime === time && !isStartSelected) ? 'selected' : ''
            }`}
            id={time}
            key={time}
            onClick={() => handleTimeButtonClick(time)}
            disabled={isDisabled}
          >
            {time}
            {startTime === time && isStartSelected && <p>시작 시간</p>}
            {endTime === time && !isStartSelected && <p>종료 시간</p>}
          </button>
        );
      }
    }
    return timeButtons;
  }

  // 이미 저장된 일정 중에 해당 시간대가 선택되어 있는지 확인
  function isTimeSlotBooked(selectedDate, selectedTime) {
    for (let marker = 0; marker < markers - 1; marker++) {
      if (marker.info.date === selectedDate) {
        const markerStartTime = moment(marker.info.time.from, 'HH:mm');
        const markerEndTime = moment(marker.info.time.until, 'HH:mm');
        const selectedMoment = moment(selectedTime, 'HH:mm');

        // 새로운 마커를 만들려는 시간대가 이미 저장된 마커의 시간대와 겹치면 true를 반환
        if (
          (selectedMoment.isSameOrAfter(markerStartTime) && selectedMoment.isBefore(markerEndTime)) ||
          (selectedMoment.isSameOrAfter(markerStartTime) && selectedMoment.isSameOrBefore(markerEndTime))
        ) {
          return true; // 시간대가 이미 선택된 경우
        }
      }
    }
    return false; // 시간대가 사용 가능한 경우
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
