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
      <div className='kr-weather-text-div'>
        <h2 className='kr-weather-text1'>한국</h2>
        <h2 className='kr-weather-text2'>{weatherData && `${currentDate()} 날씨`}</h2>
      </div>
      <div>
        {weatherData && (
          <div className='kr-weather-current'>
            <h2 className='city'>{city}</h2>
            <p className='c'>{weatherData.current.feelslike_c}°</p>
            <p className='text'>{weatherData.current.condition.text}</p>
          </div>
        )}
      </div>
      <KrHourlyWeather days={forecast} />
      <KrForecastWeather days={forecast} />
      <div className='kr-weather-where-container'>
        <h2 className='kr-where'>국내도 즐겁죠!</h2>
        <ul className='kr-weather-where'>
          {cities.kr.map((krCity, index) => (
            <li
              className='jp-weather-city'
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
    </div>
  );
}

export default KrWeather;
