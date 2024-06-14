import './KoreaDefaultLayout.css';
import { Outlet } from 'react-router-dom';
import KrNavBar from './KrNavBar';
import ApplicationHeader from '@components/App-Header/ApplicationHeader';

function KrDefaultLayout({ isLoggedIn, onChangeIsLoggedIn, onChangeUserId, displayName, onChangeDisplayName }) {
  return (
    <div className='kr-default-layout scroll-box'>
      <ApplicationHeader
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
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
