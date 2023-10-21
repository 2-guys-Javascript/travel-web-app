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
      console.log(user);
      console.log('success!');
      navigate('/login');
    } catch (error) {
      console.log('Failed!');
      console.log(error);
    }
  }

  return (
    <>
      <form action='post' className='sign-up-form' onSubmit={handleSignUpSubmit}>
        <div>
          <label htmlFor='email'>Email : </label>
          <input type='email' id='email' name='email' />
        </div>
        <div>
          <label htmlFor='password'>Password : </label>
          <input type='password' id='password' name='password' />
        </div>
        <div>
          <label htmlFor='nickname'>닉네임 : </label>
          <input type='text' id='nickname' name='nickname' />
        </div>
        <button type='submit'>회원 가입</button>
      </form>
    </>
  );
}

export default SignUpForm;
