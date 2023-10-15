import { Link } from 'react-router-dom';

function KrNavBar() {
  return (
    <footer className='korea-footer'>
      <nav className='korea-navbar'>
        <Link to='/'>Home</Link>
        <Link to='korea/weather'>날씨</Link>
        <Link to='korea'>지도</Link>
      </nav>
    </footer>
  );
}

export default KrNavBar;
