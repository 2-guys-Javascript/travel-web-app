// 사용자가 애플리케이션을 사용하는 당일에 대한 시간대별 날씨 정보 컴포넌트
function JpHourlyWeather({ days }) {
  if (days === '') {
    return null;
  }

  return (
    <ul className='japan-weather-hourly scroll-box'>
      {days[0].hour.map((hour) => (
        <li key={hour.time.slice(10, 13)}>
          <p> {hour.time.slice(10, 13)}시 </p>
          <img className='japan-weather-hourly-icon' src={hour.condition.icon} />
          <p> {hour.feelslike_c}° </p>
        </li>
      ))}
    </ul>
  );
}

export default JpHourlyWeather;
