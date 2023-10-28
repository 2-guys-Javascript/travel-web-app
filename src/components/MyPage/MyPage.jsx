import ApplicationHeader from '../App-Header/ApplicationHeader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import './Mypage.css';

function MyPage({ isLoggedIn, onChangeIsLoggedIn, userId, onChangeUserId, displayName, onChangeDisplayName }) {
  // MyPage 의 사용자 정보에서만 쓰이는 displayName 상태가 따로 있어야, 이를 수정해도 ApplicationHeader의 이름이 같이 변하지 않는다
  const [myPageDisplayName, setMyPageDisplayName] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState('');
  const [passwordCheckMismatch, setPasswordCheckMismatch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedDisplayName = localStorage.getItem('displayName');

    if (storedLoginStatus) {
      onChangeIsLoggedIn(storedLoginStatus);
      onChangeUserId(storedUserId);
      onChangeDisplayName(storedDisplayName);

      // 다음 코드는 input에서의 보이는 값을 불러오는 것
      setMyPageDisplayName(storedDisplayName);
    }
  }, []);

  function handleChangeUserNickname(ev) {
    setMyPageDisplayName(ev.target.value);
  }

  async function handleDeleteUser() {
    try {
      // Todo : 삭제할 사용자의 컬렉션을 데이터베이스에서 지워주는 작업이 필요합니다
      const user = auth.currentUser;

      await user.delete();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('displayName');
      onChangeIsLoggedIn(false);
      onChangeUserId('');
      onChangeDisplayName('');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  // 폼에서 사용자가 비밀번호까지 입력을 해야 변경을 허용하는 시스템입니다.
  // 왜냐? auth.currentUser 정보에 이메일은 있는데, 비번은 존재하지 않네요... 따라서 사용자에게로부터
  // 입력을 받는 형식으로 하겠습니다. 이 방식이 좀 더 사용자로부터 확인을 한번 더 받는 것이기도 하구요
  async function handleModifyUserInfo(ev) {
    ev.preventDefault();
    const changingNickname = ev.target.elements.nickname.value;
    const password = ev.target.elements.password.value;
    const passwordMismatch = ev.target.elements['password-check'].value;

    if (password === passwordMismatch) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, auth.currentUser.email, password);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: changingNickname,
        });

        localStorage.setItem('displayName', changingNickname);
        navigate('/');
      } catch (error) {
        console.log(error);
        console.log(password);
        if (password === '') {
          setPasswordCheckMismatch('');
          setPasswordMismatch('비밀번호를 입력해주세요.');
        } else {
          setPasswordCheckMismatch('');
          setPasswordMismatch('입력하신 비밀번호가 일치하지 않습니다.');
        }
      }
    } else {
      if (password !== passwordMismatch) {
        if (passwordMismatch === '') {
          setPasswordMismatch('');
          setPasswordCheckMismatch('비밀번호를 입력해주세요.');
        } else {
          setPasswordMismatch('');
          setPasswordCheckMismatch('비밀번호 확인의 내용이 다릅니다. 비밀번호 확인해주세요.');
        }
      }
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ApplicationHeader
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
        userId={userId}
        onChangeUserId={onChangeUserId}
        displayName={displayName}
        onChangeDisplayName={onChangeDisplayName}
      />
      <div className='mypage-defauly-layout' onSubmit={handleModifyUserInfo}>
        <div className='title'>
          <img className='goback' src='/src/assets/left-arrow.png' alt='뒤로가기' onClick={handleGoBack} />
          <h2>마이페이지</h2>
        </div>

        <form action='post' className='mypage-information-form'>
          <div>
            <label htmlFor='profile-image'>프로필 이미지</label>
            <br />
            <input id='profile-image' name='profile-image' type='file' />
          </div>
          <div>
            <label htmlFor='nickname'>닉네임</label>
            <br />
            <input
              id='nickname'
              name='nickname'
              type='text'
              value={myPageDisplayName}
              onChange={handleChangeUserNickname}
            />
          </div>
          <div>
            <label htmlFor='pasword'>기존 비밀번호 입력</label>
            <br />
            <input type='password' id='password' name='password' />
          </div>
          <div className='mismatch'>{passwordMismatch}</div>
          <div>
            <label htmlFor='password-check'>비밀번호 확인</label>
            <br />
            <input type='password' id='password-check' name='password-check' />
          </div>
          <div className='mismatch'>{passwordCheckMismatch}</div>
          <div className='mypage-delete-modify-container'>
            <div className='mypage-delete-div' onClick={handleDeleteUser}>
              계정 삭제
            </div>
            <button type='submit'>수정 완료</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MyPage;
