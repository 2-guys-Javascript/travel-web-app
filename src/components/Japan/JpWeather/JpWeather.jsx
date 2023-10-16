import { useState } from 'react';
import JpHourlyWeather from './JpHourlyWeather';
import JpForecastWeather from './JpForecastWeather';

function JpWeather() {
  // 사용자가 선택한 도시의 데이터를 나타내는 상태
  const [weatherData, setWeatherData] = useState('');
  // 사용자가 선택한 도시의 이름을 나타내는 상태
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState('');

  // 현재 웹 애플리케이션에서 UI에 활용하는 이름은 한글이지만, fetch 요청을 날릴 때, q 매개변수에 필요한 것은 영문 도시명이기에 필요
  const cities = {
    kr: ['오사카', '교토', '고베', '도쿄', '하코네', '요코하마', '후쿠오카', '유후인', '기타큐슈', '삿포로'],
    us: ['osaka', 'kyoto', 'kobe', 'tokyo', 'hakone', 'yokohama', 'fukuoka', 'yufuin', 'kitakyushu', 'sapporo'],
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
      <h1>일본 날씨입니다</h1>
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
      <JpHourlyWeather days={forecast} />
      <JpForecastWeather days={weatherData} />

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

export default JpWeather;
