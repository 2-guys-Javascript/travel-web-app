import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ isLogIn, onChangeIsLogIn }) {
  function handleClickButton() {
    onChangeIsLogIn(!isLogIn);
  }

  return (
    <div>
      <h1></h1>
      {!isLogIn ? (
        <Link to='login'>
          <button onClick={handleClickButton}>로그인</button>
        </Link>
      ) : (
        <button onClick={handleClickButton}>아웃</button>
      )}
    </div>
  );
}

export default Header;
