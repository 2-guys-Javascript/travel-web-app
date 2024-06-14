import { useEffect } from 'react';
import LoginMap from '@components/Maps/LoginMap';
import NonLoginMap from '@components/Maps/NonLoginMap';

function Japan({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedDisplayName = localStorage.getItem('displayName');

    if (storedLoginStatus) {
      onChangeIsLoggedIn(storedLoginStatus);
      onChangeUserId(storedUserId);
      onChangeDisplayName(storedDisplayName);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <LoginMap
          isLoggedIn={isLoggedIn}
          onChangeIsLoggedIn={onChangeIsLoggedIn}
          userId={userId}
          onChangeUserId={onChangeUserId}
          displayName={displayName}
          onChangeDisplayName={onChangeDisplayName}
        />
      ) : (
        <NonLoginMap />
      )}
    </>
  );
}

export default Japan;
