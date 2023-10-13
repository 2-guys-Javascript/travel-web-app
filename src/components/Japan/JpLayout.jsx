import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';

export default function JpLayout() {
  return (
    <>
      <JpNavBar />
      <Outlet />
    </>
  );
}
