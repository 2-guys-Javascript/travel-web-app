import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';

export default function KrLayout() {
  return (
    <>
      <KrNavBar />
      <Outlet />
    </>
  );
}
