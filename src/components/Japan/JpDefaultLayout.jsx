import './JapanDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';
import Header from '../Header';

function JpDefaultLayout({ isLogIn, onChangeIsLogIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
  return (
    <div className='jp-default-layout scroll-box'>
      <Header isLogIn={isLogIn} onChangeIsLogIn={onChangeIsLogIn} userId={userId} displayName={displayName} />
      <Outlet />
      <JpNavBar />
    </div>
  );
}

export default JpDefaultLayout;
