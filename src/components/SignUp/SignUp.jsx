import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './signup.css';

function SignUp() {
  return (
    <div className='signup-page-outer-div'>
      <div className='signup-header'>
        sign up
        <Link to='/'>
          <button>홈으로</button>
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
