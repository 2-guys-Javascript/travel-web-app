import './JapanDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';
import ApplicationHeader from '../App-Header/ApplicationHeader';

function JpDefaultLayout({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
  return (
    <div className='jp-default-layout scroll-box'>
      <ApplicationHeader
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
        userId={userId}
        onChangeUserId={onChangeUserId}
        displayName={displayName}
        onChangeDisplayName={onChangeDisplayName}
      />
      <Outlet />
      <JpNavBar />
    </div>
  );
}

export default JpDefaultLayout;
