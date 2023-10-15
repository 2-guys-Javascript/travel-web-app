import './JapanDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';

function JpDefaultLayout() {
  return (
    <div className='jp-default-layout'>
      <Outlet />
      <JpNavBar />
    </div>
  );
}

export default JpDefaultLayout;
