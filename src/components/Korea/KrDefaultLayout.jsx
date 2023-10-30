import './KoreaDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';
import ApplicationHeader from '../App-Header/ApplicationHeader';

function KrDefaultLayout({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
  return (
    <div className='kr-default-layout scroll-box'>
      <ApplicationHeader
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
        userId={userId}
        onChangeUserId={onChangeUserId}
        displayName={displayName}
        onChangeDisplayName={onChangeDisplayName}
      />
      <Outlet />
      <KrNavBar />
    </div>
  );
}

export default KrDefaultLayout;
