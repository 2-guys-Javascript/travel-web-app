import './JapanDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import JpNavBar from './JpNavBar';
import ApplicationHeader from '@components/App-Header/ApplicationHeader'

function JpDefaultLayout({ isLoggedIn, onChangeIsLoggedIn, onChangeUserId, displayName, onChangeDisplayName }) {
  return (
    <div className='jp-default-layout scroll-box'>
      <ApplicationHeader
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
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
