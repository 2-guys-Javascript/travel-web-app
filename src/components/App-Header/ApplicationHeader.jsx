import { useState } from 'react';
import { Link } from 'react-router-dom';
import './applicationHeader.css';

// 본 객체는 임시로 css를 적용하기 위해 만든 것이며, 추후에 css 파일에 생성하여 관리해줄 것입니다

function ApplicationHeader({
  isLoggedIn,
  onChangeIsLoggedIn,
  userId,
  onChangeUserId,
  displayName,
  onChangeDisplayName,
}) {
  function handleClickButton() {
    onChangeIsLoggedIn(!isLoggedIn);
    onChangeUserId('');
    onChangeDisplayName('');

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('displayName');
  }

  return (
    <div className='application-header'>
      <h2>일단락</h2>
      <h3>{displayName}</h3>
      {!isLoggedIn ? (
        <button className='login-logout-button'>
          <Link to='login'>로그인</Link>
        </button>
      ) : (
        <button className='login-logout-button' onClick={handleClickButton}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default ApplicationHeader;
