function JpHourlyWeather({ days }) {
  if (days === '') {
    return null;
  }

  return (
    <ul className='japan-weather-hourly'>
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
