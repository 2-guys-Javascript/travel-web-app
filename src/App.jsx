import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home/Home';
import Japan from './components/Japan/Japan';
import Korea from './components/Korea/Korea';
import KrWeather from './components/Korea/KrWeather/KrWeather';
import JpWeather from './components/Japan/JpWeather/JpWeather';
import KrDefaultLayout from './components/Korea/KrDefaultLayout';
import JpDefaultLayout from './components/Japan/JpDefaultLayout';
import Exchange from './components/Japan/Exchange';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import MyPage from './components/MyPage/MyPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />} />

        <Route
          element={
            <KrDefaultLayout
              isLoggedIn={isLoggedIn}
              onChangeIsLoggedIn={setIsLoggedIn}
              onChangeUserId={setUserId}
              displayName={displayName}
              onChangeDisplayName={setDisplayName}
            />
          }
        >
          <Route
            path='/korea'
            element={
              <Korea
                isLoggedIn={isLoggedIn}
                onChangeIsLoggedIn={setIsLoggedIn}
                userId={userId}
                onChangeUserId={setUserId}
                displayName={displayName}
                onChangeDisplayName={setDisplayName}
              />
            }
          />
          <Route
            path='/korea/weather'
            element={
              <KrWeather
                onChangeIsLoggedIn={setIsLoggedIn}
                onChangeUserId={setUserId}
                onChangeDisplayName={setDisplayName}
              />
            }
          />
        </Route>

        <Route
          path='/login'
          element={
            <Login
              isLoggedIn={isLoggedIn}
              onChangeIsLoggedIn={setIsLoggedIn}
              onChangeUserId={setUserId}
              onChangeDisplayName={setDisplayName}
            />
          }
        />

        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/mypage'
          element={
            <MyPage
              isLoggedIn={isLoggedIn}
              onChangeIsLoggedIn={setIsLoggedIn}
              onChangeUserId={setUserId}
              displayName={displayName}
              onChangeDisplayName={setDisplayName}
            />
          }
        />

        <Route
          element={
            <JpDefaultLayout
              isLoggedIn={isLoggedIn}
              onChangeIsLoggedIn={setIsLoggedIn}
              onChangeUserId={setUserId}
              displayName={displayName}
              onChangeDisplayName={setDisplayName}
            />
          }
        >
          <Route
            path='/japan'
            element={
              <Japan
                isLoggedIn={isLoggedIn}
                onChangeIsLoggedIn={setIsLoggedIn}
                userId={userId}
                onChangeUserId={setUserId}
                displayName={displayName}
                onChangeDisplayName={setDisplayName}
              />
            }
          />
          <Route
            path='/japan/weather'
            element={
              <JpWeather
                onChangeIsLoggedIn={setIsLoggedIn}
                onChangeUserId={setUserId}
                onChangeDisplayName={setDisplayName}
              />
            }
          />
          <Route
            path='/japan/exchange'
            element={
              <Exchange
                onChangeIsLoggedIn={setIsLoggedIn}
                onChangeUserId={setUserId}
                onChangeDisplayName={setDisplayName}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
