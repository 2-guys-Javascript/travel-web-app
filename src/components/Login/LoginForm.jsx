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
        <div>
          <label htmlFor='email'>Email : </label>
          <input type='email' id='email' name='email' />
        </div>
        <div>
          <label htmlFor='password'>Password : </label>
          <input type='password' id='password' name='password' />
        </div>
        <button type='submit'>로그인 하기</button>
        <Link to='/signup'>
          <button>회원 가입하기</button>
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
