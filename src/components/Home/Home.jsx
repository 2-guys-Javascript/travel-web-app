import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='home-outer-div'>
      <Link to='korea'>
        {/* Link는 정말로 앵커태그로써의 역할만 하도록 따로 구분했습니다! */}
        <div className='korea-tab-div'>
          <h1>korea</h1>
        </div>
      </Link>
      <Link to='japan'>
        <div className='japan-tab-div'>
          <h1>japan</h1>
        </div>
      </Link>
    </div>
  );
}

export default Home;
