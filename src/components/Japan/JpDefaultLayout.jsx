import './JapanDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';
import Header from '../Header';

function JpDefaultLayout() {
  return (
    <div className='jp-default-layout scroll-box'>
      <Header />
      <Outlet />
      <JpNavBar />
    </div>
  );
}

export default JpDefaultLayout;
