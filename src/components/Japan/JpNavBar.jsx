import { Link } from 'react-router-dom';
import './JapanDefaultLayout.css';
function JpNavBar() {
  return (
    <footer className='japan-footer'>
      <nav className='japan-navbar'>
        <Link to='/'>Home</Link>
        <Link to='japan/weather'>날씨</Link>
        <Link to='japan'>지도</Link>
        <Link to='japan/exchange'>환율</Link>
      </nav>
    </footer>
  );
}

export default JpNavBar;
