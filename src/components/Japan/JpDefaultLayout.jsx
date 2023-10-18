import './JapanDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';

function JpDefaultLayout() {
  return (
    <div className='jp-default-layout scroll-box'>
      <Outlet />
      <JpNavBar />
    </div>
  );
}

export default JpDefaultLayout;
