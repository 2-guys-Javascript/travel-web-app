function KrHourlyWeather({ days }) {
  if (days === '') {
    return null;
  }

  return (
    <ul className='korea-weather-hourly scroll-box'>
      {days[0].hour.map((hour) => (
        <li key={hour.time.slice(10, 13)}>
          <img className='korea-weather-hourly-icon' src={hour.condition.icon} />
          <p> {hour.feelslike_c} </p>
          <p> {hour.time.slice(10, 16)} </p>
        </li>
      ))}
    </ul>
  );
}

export default KrHourlyWeather;
