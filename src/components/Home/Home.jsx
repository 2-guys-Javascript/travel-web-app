import { Navigate, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  function handleClickCountry(event) {
    const urlPath = `/${event.target.innerText}`;
    navigate(urlPath);
  }

  return (
    <div className='home-outer-div'>
      <div className='korea-tab-div ' onClick={handleClickCountry}>
        korea
      </div>
      <div className='japan-tab-div ' onClick={handleClickCountry}>
        japan
      </div>
    </div>
  );
}

export default Home;
