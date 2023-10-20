import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogButton = () => {
    setIsLogin(!isLogin);
    console.log(!isLogin);
  };

  return (
    <div>
      <h1></h1>
      {!isLogin ? (
        <Link to='login'>
          <button onClick={handleLogButton}>로그인</button>
        </Link>
      ) : (
        <button onClick={handleLogButton}>아웃</button>
      )}
    </div>
  );
}

export default Header;
