import { useState, useEffect } from 'react';
import KrForecastWeather from './KrForecastWeather';
import KrHourlyWeather from './KrHourlyWeather';

function KrWeather({ onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const [weatherData, setWeatherData] = useState('');
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
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${e}&days=3&lang=ko`;
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

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedDisplayName = localStorage.getItem('displayName');
    console.log(storedLoginStatus);
    console.log(storedUserId);
    console.log(storedDisplayName);

    if (storedLoginStatus) {
      onChangeIsLoggedIn(storedLoginStatus);
      onChangeUserId(storedUserId);
      onChangeDisplayName(storedDisplayName);
    }
  }, []);

  return (
    <div className='weather'>
      <div className='kr-weather-text-div'>
        <h2 className='kr-weather-text1'>한국</h2>
        <h2 className='kr-weather-text2'>{weatherData && `${currentDate()} 날씨`}</h2>
      </div>
      <div>
        {weatherData && (
          <div className='weather-current'>
            <h2 className='city'>{city}</h2>
            <p className='c'>{weatherData.current.feelslike_c}°</p>
            <p className='text'>{weatherData.current.condition.text}</p>
          </div>
        )}
      </div>
      <KrHourlyWeather days={forecast} />
      <KrForecastWeather days={forecast} />
      <div className='weather-where-container'>
        <h2 className='kr-where'>국내도 즐겁죠!</h2>
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
    </div>
  );
}

export default KrWeather;
