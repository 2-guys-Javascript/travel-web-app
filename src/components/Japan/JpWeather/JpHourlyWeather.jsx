function JpHourlyWeather({ days }) {
  if (days === '') {
    return null;
  }

  return (
    <ul className='japan-weather-hourly'>
      {days[0].hour.map((hour) => (
        <li>
          <img className='japan-weather-hourly-icon' src={hour.condition.icon} />
          <p> {hour.feelslike_c} </p>
          <p> {hour.time.slice(10, 16)} </p>
        </li>
      ))}
    </ul>
  );
}

export default JpHourlyWeather;
