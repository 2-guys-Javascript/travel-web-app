import { useState } from 'react';

function KrWeather() {
  const [weatherData, setWeatherData] = useState('');
  const [city, setCity] = useState('');

  const cities = {
    kr: ['서울', '부산', '제주', '양양', '전주', '대전', '광주', '여수', '강릉', '속초'],
    us: ['Seoul', 'Busan', 'Jeju', 'Yangyang', 'Jeonju', 'Daejeon', 'Gwangju', 'Yeosu', 'Gangneung', 'Sokcho'],
  };

  const currentDate = () => {
    const today = new Date();
    return `${today.getMonth() + 1}월 ${today.getDate()}일`;
  };

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_WEATHER_API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const fetchWeatherData = async (e) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${e}`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeatherData(result);
      console.log(result);
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
    <div className='weather'>
      <h1>한국 날씨입니다</h1>
      <div className='weather-current'>현재 날씨</div>
      <div>
        {weatherData && (
          <div>
            <h2>{city}</h2>
            <img src={weatherData.current.condition.icon}></img>
            <p>{weatherData.current.feelslike_c}</p>
            <p>{weatherData.current.condition.text}</p>
          </div>
        )}
      </div>
      <h2>{currentDate()} 날씨입니다</h2>
      <ul className='weather-day'>
        <li className='weather-time'></li>
      </ul>

      <ul className='weather-where'>
        {cities.kr.map((krCity, index) => (
          <li
            className='weather-city'
            key={krCity}
            onClick={(e) => {
              setCity(e.target.innerText);
              fetchWeatherData(cities.us[index]);
            }}
          >
            {krCity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KrWeather;
