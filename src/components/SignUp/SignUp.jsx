import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './signup.css';

function SignUp() {
  return (
    <div className='signup-page-outer-div'>
      <div className='signup-header'>
        <h2>Sign up</h2>
        <button>
          <Link to='/'>홈으로</Link>
        </button>
      </div>
      <SignUpForm />
      <div className='__or__'> 또는 </div>
      <Link to='/login'>Go Back to Log-In page!</Link>
    </div>
  );
}

export default SignUp;
