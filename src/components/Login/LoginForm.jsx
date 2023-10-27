import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

function LoginForm({ isLoggedIn, onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const navigate = useNavigate();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    const email = ev.target.elements.email.value;
    const password = ev.target.elements.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      console.log('Success!');

      onChangeIsLoggedIn(!isLoggedIn);
      onChangeUserId(user.uid);
      onChangeDisplayName(user.displayName);
      navigate('/home');
    } catch (error) {
      alert('Failed!');
      console.log(error);
    }
  }

  return (
    <>
      <form action='post' className='login-form' onSubmit={handleLoginSubmit}>
        <input className='email-input' type='email' id='email' name='email' placeholder='Email을 입력하세요' />

        <input
          className='password-input'
          type='password'
          id='password'
          name='password'
          placeholder='비밀번호를 입력하세요'
        />
        <button type='submit' className='submit-button'>
          로그인 하기
        </button>

        <Link to='/signup'>Sign up here!</Link>
      </form>
    </>
  );
}

export default LoginForm;
