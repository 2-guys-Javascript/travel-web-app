import { Link } from 'react-router-dom';

function KrNavBar() {
  return (
    <footer className='korea-footer'>
      <nav className='korea-navbar'>
        <Link to='/'>
          <img src='/assets/nav-home.png' alt='홈' />
        </Link>
        <Link to='/korea/weather'>
          <img src='/assets/nav-weather.png' alt='날씨' />
        </Link>
        <Link to='/korea'>
          <img src='/assets/nav-map.png' alt='지도' />
        </Link>
      </nav>
    </footer>
  );
}

export default KrNavBar;
