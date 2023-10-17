function JpHourlyWeather({ days }) {
  if (days === '') {
    return <div></div>;
  }

  return (
    <ul className='japan-weather-hourly'>
      {days[0].hour.map((hour) => (
        <div>
          <img className='japan-weather-hourly-icon' src={hour.condition.icon} />
          <p> {hour.feelslike_c} </p>
          <p> {hour.time.slice(10, 16)} </p>
        </div>
      ))}
    </ul>
  );
}

export default JpHourlyWeather;
