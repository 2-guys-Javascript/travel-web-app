import LoginMap from '../Maps/LoginMap';
import NonLoginMap from '../Maps/NonLoginMap';

function Japan({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
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
      <div>This is Japan</div>
    </>
  );
}

export default Japan;
