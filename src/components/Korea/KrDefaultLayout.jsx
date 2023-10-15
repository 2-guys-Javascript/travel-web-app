import './KoreaDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';

function KrDefaultLayout() {
  return (
    <div className='kr-default-layout'>
      <Outlet />
      <KrNavBar />
    </div>
  );
}

export default KrDefaultLayout;
