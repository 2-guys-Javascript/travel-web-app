import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import './signup.css';

function SignUpForm() {
  const navigate = useNavigate();

  async function handleSignUpSubmit(ev) {
    ev.preventDefault();
    const email = ev.target.elements.email.value;
    const password = ev.target.elements.password.value;
    const nickname = ev.target.elements.nickname.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: nickname,
      });

      navigate('/login');
    } catch (error) {
      console.log('Failed!');
      console.log(error);
    }
  }

  return (
    <>
      <form action='post' className='sign-up-form' onSubmit={handleSignUpSubmit}>
        <input type='email' id='email' name='email' placeholder='등록하실 Email' className='signup-email-input' />
        <input type='password' id='password' name='password' placeholder='비밀번호' className='signup-password-input' />
        <input
          type='text'
          id='nickname'
          name='nickname'
          placeholder='사용하실 닉네임'
          className='signup-nickname-input'
        />
        <button type='submit' className='signup-button'>
          회원 가입
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
