import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './signup.css';

function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');

    if (storedLoginStatus) {
      navigate('/')
    }
  }, []);
  return (
    <div className='signup-page-outer-div scroll-box'>
      <div className='signup-header'>
        <h2>회원가입</h2>
        <button>
          <Link to='/'>홈으로</Link>
        </button>
      </div>
      <h2 className='signup-text1'>일단락에 오신 것을 환영해요!</h2>
      <h2 className='signup-text2'>회원 정보를 입력해주세요.</h2>
      <SignUpForm />
      <div className='__or__'> 또는 </div>
      <div className='to-login'>
        <Link to='/login'>로그인 페이지로</Link>
      </div>
    </div>
  );
}

export default SignUp;
