import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { auth, provider } from '../../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import './login.css';

function Login({ isLoggedIn, onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const navigate = useNavigate();

  async function handleGithubLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onChangeIsLoggedIn(!isLoggedIn);
      onChangeUserId(user.uid);
      onChangeDisplayName(user.displayName);
      console.log(result);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login-page-outer-div'>
      <div className='login-header'>
        <h2>로그인</h2>
        <button>
          <Link to='/'>홈으로</Link>
        </button>
      </div>

      <LoginForm
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
        onChangeUserId={onChangeUserId}
        onChangeDisplayName={onChangeDisplayName}
      />
      <div className='__or__'> 또는 </div>

      <div className='github-login-div'>
        <img
          className='github-img'
          src='/src/assets/github-logo.png'
          alt='깃허브로 로그인'
          onClick={handleGithubLogin}
        />
      </div>
    </div>
  );
}

export default Login;
