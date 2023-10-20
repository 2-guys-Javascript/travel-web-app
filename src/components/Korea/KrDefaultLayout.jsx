import './KoreaDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';
import Header from '../Header';

function KrDefaultLayout() {
  return (
    <div className='kr-default-layout scroll-box'>
      <Header />
      <Outlet />
      <KrNavBar />
    </div>
  );
}

export default KrDefaultLayout;
