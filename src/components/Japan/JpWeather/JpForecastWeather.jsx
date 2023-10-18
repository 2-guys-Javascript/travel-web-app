// 오늘, 내일, 모레에 대한 기상 예보를 나타내는 컴포넌트
function JpForecastWeather({ days }) {
  if (days === '') {
    return null;
  }

  return (
    <ul className='japan-forecast'>
      <li>
        <span>오늘</span>
        <img src={days[0].day.condition.icon}></img>
        <span>{days[0].day.mintemp_c}°</span>
        <span>{days[0].day.maxtemp_c}°</span>
      </li>
      <li>
        <span>내일</span>
        <img src={days[1].day.condition.icon}></img>
        <span>{days[1].day.mintemp_c}°</span>
        <span>{days[1].day.maxtemp_c}°</span>
      </li>
      <li className='last'>
        <span>모래</span>
        <img src={days[2].day.condition.icon}></img>
        <span>{days[2].day.mintemp_c}°</span>
        <span>{days[2].day.maxtemp_c}°</span>
      </li>
    </ul>
  );
}

export default JpForecastWeather;
