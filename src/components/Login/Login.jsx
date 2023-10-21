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
        login
        <Link to='/'>
          <button>홈으로</button>
        </Link>
      </div>
      <LoginForm
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
        onChangeUserId={onChangeUserId}
        onChangeDisplayName={onChangeDisplayName}
      />
      <div>Blank</div>
      <button onClick={handleGithubLogin}>Github로 로그인하기</button>
    </div>
  );
}

export default Login;
