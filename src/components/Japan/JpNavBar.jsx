import { Link } from 'react-router-dom';
import './JpNavBar.css';

function JpNavBar() {
  return (
    <footer className='japan-footer'>
      <nav className='japan-navbar'>
        <Link to='/'>
          <img src='/assets/nav-home.png' alt='홈' />
        </Link>
        <Link to='/japan/weather'>
          <img src='/assets/nav-weather.png' alt='날씨' />
        </Link>
        <Link to='/japan'>
          <img src='/assets/nav-map.png' alt='지도' />
        </Link>
        <Link to='/japan/exchange'>
          <img src='/assets/nav-exchange.png' alt='환율' />
        </Link>
      </nav>
    </footer>
  );
}

export default JpNavBar;
