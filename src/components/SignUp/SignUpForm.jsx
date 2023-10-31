import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import './signup.css';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  async function handleSignUpSubmit(ev) {
    ev.preventDefault();
    const inputEmail = ev.target.elements.email.value;
    const inputPassword = ev.target.elements.password.value;
    const inputNickname = ev.target.elements.nickname.value;
    const exp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9_\-]+/;

    setEmail('');
    setPassword('');
    setNickname('');

    if (!exp.test(inputEmail) || inputPassword.length < 6 || inputNickname === '') {
      if (!exp.test(inputEmail)) {
        setEmail('올바른 형식의 이메일이 아닙니다.');
        if (inputEmail === '') {
          setEmail('이메일을 입력해주세요.');
        }
      }

      if (inputPassword.length < 6) {
        setPassword('비밀번호는 6글자 이상이어야 합니다.');
        if (inputPassword === '') {
          setPassword('비밀번호를 입력해주세요.');
        }
      }

      if (inputNickname === '') {
        setNickname('닉네임을 입력해주세요.');
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: inputNickname,
        });

        navigate('/login');
      } catch (error) {
        if (error.code === 'auth/missing-email') {
          setEmail('이미 존재하는 이메일입니다.');
        }
        if (error.code === 'auth/invalid-email') {
          setEmail('잘못된 형식의 이메일입니다.');
        }
        console.log('Failed!');
      }
    }
  }

  return (
    <>
      <form action='post' className='sign-up-form' onSubmit={handleSignUpSubmit}>
        <label htmlFor='email'>이메일</label>
        <input type='email' id='email' name='email' placeholder='Email' className='signup-email-input' />
        <div className='check'>{email}</div>
        <label htmlFor='password'>비밀번호</label>
        <input type='password' id='password' name='password' placeholder='비밀번호' className='signup-password-input' />
        <div className='check'>{password}</div>
        <label htmlFor='nickname'>닉네임</label>
        <input
          type='text'
          id='nickname'
          name='nickname'
          placeholder='사용하실 닉네임'
          className='signup-nickname-input'
        />
        <div className='check'>{nickname}</div>
        <button type='submit' className='signup-button'>
          회원 가입
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
