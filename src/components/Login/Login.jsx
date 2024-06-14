import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { auth, googleProvider, githubProvider, facebookProvider } from '@/../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import './login.css';

function Login({ isLoggedIn, onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');

    if (storedLoginStatus) {
      navigate('/')
    }
  }, []);

  async function handleGithubLogin() {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      onChangeIsLoggedIn(!isLoggedIn);
      onChangeUserId(user.uid);
      onChangeDisplayName(user.displayName);

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('displayName', user.displayName);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      onChangeIsLoggedIn(!isLoggedIn);
      onChangeUserId(user.uid);
      onChangeDisplayName(user.displayName);

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('displayName', user.displayName);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFacebookLogin() {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      onChangeIsLoggedIn(!isLoggedIn);
      onChangeUserId(user.uid);
      onChangeDisplayName(user.displayName);

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('displayName', user.displayName);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login-page-outer-div scroll-box'>
      <div className='login-header'>
        <h2>로그인</h2>
        <div></div>
        <button>
          <Link to='/'>홈으로</Link>
        </button>
      </div>
      <img className='project-logo' src='assets/일단락.png' alt='메인로고' />
      <LoginForm
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
        onChangeUserId={onChangeUserId}
        onChangeDisplayName={onChangeDisplayName}
      />
      <div className='__or__'> 또는 </div>

      <div className='google-login-div' onClick={handleGoogleLogin}>
        <img className='google-img' src='/assets/google-logo.png' alt='구글로 로그인' />
        <span>Google 계정으로 로그인</span>
      </div>
      <div className='facebook-login-div' onClick={handleFacebookLogin}>
        <img className='facebook-img' src='/assets/facebook-logo.png' alt='페이스북으로 로그인' />
        <span>Facebook 계정으로 로그인</span>
      </div>
      <div className='github-login-div' onClick={handleGithubLogin}>
        <img className='github-img' src='/assets/github-logo.png' alt='깃허브로 로그인' />
        <span>Github 계정으로 로그인</span>
      </div>
    </div>
  );
}

export default Login;
