import { Link } from 'react-router-dom';

function KrNavBar() {
  return (
    <header>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='korea/weather'>날씨</Link>
        <Link to='korea'>지도</Link>
      </nav>
    </header>
  );
}

export default KrNavBar;
