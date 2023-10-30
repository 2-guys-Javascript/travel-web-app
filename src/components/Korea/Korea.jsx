import { useEffect } from 'react';
import LoginMap from '../Maps/LoginMap';
import NonLoginMap from '../Maps/NonLoginMap';

function Korea({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
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

export default Korea;
