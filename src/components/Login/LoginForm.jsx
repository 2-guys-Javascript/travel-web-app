import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/../firebaseConfig';
import { useState } from 'react';

function LoginForm({ isLoggedIn, onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const [errorMessageOne, setErrorMessageOne] = useState('');
  const [errorMessageTwo, setErrorMessageTwo] = useState('');

  const navigate = useNavigate();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    const email = ev.target.elements.email.value;
    const password = ev.target.elements.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      onChangeIsLoggedIn(!isLoggedIn);
      onChangeUserId(user.uid);
      onChangeDisplayName(user.displayName);

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('displayName', user.displayName);

      navigate('/');
    } catch (error) {
      setErrorMessageOne('계정이 존재하지 않거나 이메일 또는 비밀번호가 틀렸습니다.');
      setErrorMessageTwo('다시 시도해주세요');
    }
  }

  return (
    <div>
      <form action='post' className='login-form' onSubmit={handleLoginSubmit}>
        <input className='email-input' type='email' id='email' name='email' placeholder='Email을 입력하세요' />

        <input
          className='password-input'
          type='password'
          id='password'
          name='password'
          placeholder='비밀번호를 입력하세요'
        />
        <div className='check'>
          <div>{errorMessageOne}</div>
          <div>{errorMessageTwo}</div>
        </div>
        <button type='submit' className='submit-button'>
          로그인 하기
        </button>
        <div className='to-signup'>
          <span className='isMember'>회원이 아니신가요?</span>
          <Link to='/signup'>간편 회원가입</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
