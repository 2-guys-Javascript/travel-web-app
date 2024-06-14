import { useState, useEffect, useCallback } from 'react';
import JpHourlyWeather from './JpHourlyWeather';
import JpForecastWeather from './JpForecastWeather';
import './JpWeather.css';

function JpWeather({ onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const [weatherData, setWeatherData] = useState('');
  const [city, setCity] = useState('');

  const [forecast, setForecast] = useState('');

  const cities = {
    kr: ['오사카', '교토', '고베', '도쿄', '하코네', '요코하마', '후쿠오카', '유후인', '기타큐슈', '삿포로'],
    us: ['osaka', 'kyoto', 'kobe', 'tokyo', 'hakone', 'yokohama', 'fukuoka', 'yufuin', 'kitakyushu', 'sapporo'],
  };

  const currentDate = useCallback(() => {
    const today = new Date();
    return `${today.getMonth() + 1}월 ${today.getDate()}일`;
  },[]);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_WEATHER_API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const fetchWeatherData = useCallback(async (e) => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${e}&days=3&lang=ko`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeatherData(result);
      setForecast(result.forecast.forecastday.map((day) => day));
    } catch (error) {
      setWeatherData(null);
    }
  },[]);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedDisplayName = localStorage.getItem('displayName');

    if (storedLoginStatus) {
      onChangeIsLoggedIn(storedLoginStatus);
      onChangeUserId(storedUserId);
      onChangeDisplayName(storedDisplayName);
    }
  }, []);

  return (
    <div className='weather'>
      <div className='jp-weather-text-div'>
        <h2 className='jp-weather-text1'>일본</h2>
        <h2 className='jp-weather-text2'>{weatherData && `${currentDate()} 날씨`}</h2>
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
      <JpHourlyWeather days={forecast} />
      <JpForecastWeather days={forecast} />
      <div className='weather-where-container'>
        <h2 className='jp-where'>어디로 놀러가시나요?</h2>
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

export default JpWeather;
