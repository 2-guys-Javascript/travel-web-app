import { useState } from 'react';
import JpHourlyWeather from './JpHourlyWeather';
import JpForecastWeather from './JpForecastWeather';

function JpWeather() {
  const [weatherData, setWeatherData] = useState('');
  const [city, setCity] = useState('');
  // 사용자가 api 요청을 오늘, 내일, 그리고 모레에 대한 3일을 기준으로 날리기에 길이가 3짜리인 배열 상태가 될 것임
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
    }
  };

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
      {/* JpHourWeather과 JpForecastWeather 컴포넌트는 prop으로 전달된 days가 빈 문자열이면 null 반환으로 UI로 나타나지 않음 */}
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
