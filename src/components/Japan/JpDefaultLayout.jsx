import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';

function JpDefaultLayout() {
  return (
    <>
      <JpNavBar />
      <Outlet />
    </>
  );
}

export default JpDefaultLayout;
