import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';

function KrDefaultLayout() {
  return (
    <>
      <KrNavBar />
      <Outlet />
    </>
  );
}

export default KrDefaultLayout;
