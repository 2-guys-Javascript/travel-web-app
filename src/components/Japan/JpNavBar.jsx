import { Link } from 'react-router-dom';

function JpNavBar() {
  return (
    <header>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='japan/weather'>날씨</Link>
        <Link to='japan'>지도</Link>
        <Link to='japan/exchange'>환율</Link>
      </nav>
    </header>
  );
}

export default JpNavBar;
