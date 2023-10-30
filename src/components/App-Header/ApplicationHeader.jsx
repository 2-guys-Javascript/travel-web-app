import { Link, useNavigate } from 'react-router-dom';
import './applicationHeader.css';

function ApplicationHeader({
  isLoggedIn,
  onChangeIsLoggedIn,
  userId,
  onChangeUserId,
  displayName,
  onChangeDisplayName,
}) {
  const navigate = useNavigate();

  function handleClickButton() {
    onChangeIsLoggedIn(!isLoggedIn);
    onChangeUserId('');
    onChangeDisplayName('');

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('displayName');
  }

  function handleClickIldanrak() {
    navigate('/');
  }

  function handleClickMypage() {
    navigate('/mypage');
  }

  return (
    <div className='application-header'>
      <h2 onClick={handleClickIldanrak}>일단락</h2>
      {isLoggedIn && (
        <button className='my-page-button' onClick={handleClickMypage}>
          마이페이지
        </button>
      )}
      <h3>{displayName}</h3>
      {!isLoggedIn ? (
        <button className='login-logout-button'>
          <Link to='/login'>로그인</Link>
        </button>
      ) : (
        <button className='login-logout-button' onClick={handleClickButton}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default ApplicationHeader;
