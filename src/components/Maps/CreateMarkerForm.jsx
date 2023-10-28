import { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Map.css';

// onCreateMarker는 handleCreateMarker() 함수가 전달된 것으로 폼 정보만 인자로 넣기
function CreateMarkerForm({ onCreateMarker, markers, userId }) {
  const [isSubmitClick, setIsSubmitClick] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isStartSelected, setIsStartSelected] = useState(false);
  const [isMorningSelected, setIsMorningSelected] = useState(true);
  const [calendarTimeMarkers, setCalendarTimeMarkers] = useState([]);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(moment(new Date()).format('YYYY년 MM월 DD일'));

  function handleCalendarChange(e) {
    setDateValue(moment(e));
    setSelectedCalendarDate(moment(e).format('YYYY년 MM월 DD일'));
  }

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

  function TimeButtons() {
    const timeButtons = [];
    const selectedDay = moment(selectedCalendarDate, 'YYYY년 MM월 DD일').date();

    for (let hour = isMorningSelected ? 0 : 12; hour < (isMorningSelected ? 12 : 24); hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = moment({ hour, minute }).format('HH:mm');

        // 시간 버튼을 선택된 날짜의 날짜에 따라 보여줍니다.
        if (selectedDay === moment(dateValue).date()) {
          // 이미 존재하는 마커의 시간대인 경우 클래스 추가
          const isExistingTime = calendarTimeMarkers.slice(0, calendarTimeMarkers.length).some((marker) => {
            return (
              marker.info.date === selectedCalendarDate &&
              time >= marker.info.time.from &&
              time < marker.info.time.until
            );
          });

          timeButtons.push(
            <button
              className={`times ${startTime === time || endTime === time ? 'selected' : ''} ${
                isExistingTime ? 'existing' : ''
              }`}
              id={time}
              key={time}
              onClick={() => handleTimeButtonClick(time)}
            >
              {time}
              {startTime === time && <p>시작 시간</p>}
              {endTime === time && <p>종료 시간</p>}
            </button>
          );
        }
      }
    }

    return timeButtons;
  }

  function handleToggleMorning() {
    setIsMorningSelected(!isMorningSelected);
  }

  function handleSubmitForm(ev) {
    ev.preventDefault();

    if (startTime && endTime && ev.target.elements.title.value && ev.target.elements.detail.value && isSubmitClick) {
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

  useEffect(() => {
    setCalendarTimeMarkers([]);
    const fetchCalendarMarkersData = async () => {
      try {
        const documentRef = doc(db, userId, selectedCalendarDate);
        const snapShot = await getDoc(documentRef);
        const fetchedDocument = snapShot.data();
        const markerArray = [];
        for (const myKey in fetchedDocument) {
          markerArray.push(fetchedDocument[myKey]);
        }
        setCalendarTimeMarkers(markerArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCalendarMarkersData();
  }, [selectedCalendarDate]);

  return (
    <form className='create-marker-form' onSubmit={handleSubmitForm}>
      <div>
        <Calendar
          onChange={handleCalendarChange}
          value={dateValue}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
        />
      </div>
      <button className='toggle-am' onClick={handleToggleMorning}>
        <span className={!isMorningSelected ? 'pm' : 'am'}>오전 </span>
        <span className={!isMorningSelected ? 'am' : 'pm'}> 오후</span>
      </button>
      <div className='time-box'>
        <TimeButtons />
      </div>
      <div className='title-box'>
        <label htmlFor='title'>장소</label>
        <input type='text' id='title' name='title' />
      </div>
      <div className='detail-box'>
        <label htmlFor='detail'>메모</label>
        <input type='text' id='detail' name='detail' />
      </div>
      <button onClick={() => setIsSubmitClick(true)} className='submit' type='submit'>
        제출
      </button>
    </form>
  );
}

export default CreateMarkerForm;
