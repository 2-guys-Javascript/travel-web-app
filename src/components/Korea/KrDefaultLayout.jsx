import './KoreaDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';
import Header from '../Header';

function KrDefaultLayout({ isLogIn, onChangeIsLogIn }) {
  return (
    <div className='kr-default-layout scroll-box'>
      <Header isLogIn={isLogIn} onChangeIsLogIn={onChangeIsLogIn} />
      <Outlet />
      <KrNavBar />
    </div>
  );
}

export default KrDefaultLayout;
