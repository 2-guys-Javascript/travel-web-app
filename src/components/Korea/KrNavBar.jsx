import { Link } from 'react-router-dom';

export default function KrNavBar() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="korea/weather">날씨</Link>
        <Link to="korea">지도</Link>
      </nav>
    </header>
  );
}
