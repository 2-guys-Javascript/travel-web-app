import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='home-outer-div'>
      <Link to='korea' className='korea-tab-div'>
        <div>
          <h1 className='korea'>KOREA</h1>
        </div>
      </Link>
      <div className='project-name'>일단락</div>
      <img className='opening' src='/src/assets/opening.png' alt='오프닝' />
      <Link to='japan' className='japan-tab-div'>
        <div>
          <h1 className='japan'>JAPAN</h1>
        </div>
      </Link>
    </div>
  );
}

export default Home;
