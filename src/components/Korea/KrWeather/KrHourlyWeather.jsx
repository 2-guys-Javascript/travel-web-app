function KrHourlyWeather({ days }) {
  if (days === '') {
    return null;
  }

  return (
    <ul className='weather-hourly scroll-box'>
      {days[0].hour.map((hour) => (
        <li key={hour.time.slice(10, 13)}>
          <p> {hour.time.slice(10, 13)}시 </p>
          <img className='weather-hourly-icon' src={hour.condition.icon} />
          <p> {Math.floor(hour.feelslike_c)}° </p>
        </li>
      ))}
    </ul>
  );
}

export default KrHourlyWeather;
