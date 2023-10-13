import { Link } from 'react-router-dom';

export default function JpNavBar() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="japan/weather">날씨</Link>
        <Link to="japan">지도</Link>
        <Link to="japan/exchange">환율</Link>
      </nav>
    </header>
  );
}
