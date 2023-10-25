import LoginMap from '../Maps/LoginMap';
import NonLoginMap from '../Maps/NonLoginMap';

function Korea({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
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
