import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';

function KrLayout() {
  return (
    <>
      <KrNavBar />
      <Outlet />
    </>
  );
}

export default KrLayout;
