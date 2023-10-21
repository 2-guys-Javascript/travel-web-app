import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ isLogIn, onChangeIsLogIn, userId, displayName }) {
  function handleClickButton() {
    onChangeIsLogIn(!isLogIn);
  }

  return (
    <div>
      <h1>사용자의 uid = {userId}</h1>
      <h1>사용자의 닉네임 : {displayName}</h1>
      {!isLogIn ? (
        <Link to='login'>
          <button>로그인</button>
        </Link>
      ) : (
        <button onClick={handleClickButton}>아웃</button>
      )}
    </div>
  );
}

export default Header;
