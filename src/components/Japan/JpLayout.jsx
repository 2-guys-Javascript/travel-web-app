import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';

function JpLayout() {
  return (
    <>
      <JpNavBar />
      <Outlet />
    </>
  );
}

export default JpLayout;
