function KrHourlyWeather({ days }) {
  if (days === '') {
    return <div></div>;
  }

  return (
    <ul className='korea-weather-hourly'>
      {days[0].hour.map((hour) => (
        <div>
          <img className='korea-weather-hourly-icon' src={hour.condition.icon} />
          <p> {hour.feelslike_c} </p>
          <p> {hour.time.slice(10, 16)} </p>
        </div>
      ))}
    </ul>
  );
}

export default KrHourlyWeather;
