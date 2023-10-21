import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './login.css';

function Login({ isLogIn, onChangeIsLogIn, onChangeUserId, onChangeDisplayName }) {
  return (
    <div className='login-page-outer-div'>
      <div className='login-header'>
        login
        <Link to='/'>
          <button>홈으로</button>
        </Link>
      </div>
      <LoginForm
        isLogIn={isLogIn}
        onChangeIsLogIn={onChangeIsLogIn}
        onChangeUserId={onChangeUserId}
        onChangeDisplayName={onChangeDisplayName}
      />
    </div>
  );
}

export default Login;
