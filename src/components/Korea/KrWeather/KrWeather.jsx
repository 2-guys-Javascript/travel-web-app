import { useState } from 'react';
import KrForecastWeather from './KrForecastWeather';
import KrHourlyWeather from './KrHourlyWeather';

function KrWeather() {
  // 현재 선택된 도시의 날씨 데이터를 나타내는 상태입니다.
  const [weatherData, setWeatherData] = useState('');
  // 현재 선택된 도시 이름을 나타내는 상태입니다
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState('');

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
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${e}&days=3`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeatherData(result);
      setForecast(result.forecast.forecastday.map((day) => day));
    } catch (error) {
      setWeatherData(null);
      console.error(error);
    }
  };

  return (
    <div className='weather'>
      <h2>한국 날씨입니다</h2>
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
      <KrHourlyWeather days={forecast} />
      <KrForecastWeather days={weatherData} />

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
