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
  }

  return (
    <div className='application-header'>
      <h3>사용자의 닉네임 : {displayName}</h3>
      {!isLoggedIn ? (
        <button>
          <Link to='login'>로그인</Link>
        </button>
      ) : (
        <button onClick={handleClickButton}>아웃</button>
      )}
    </div>
  );
}

export default ApplicationHeader;
