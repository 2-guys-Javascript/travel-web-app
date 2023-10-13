import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Japan from './components/Japan/Japan';
import Korea from './components/Korea/Korea';
import KrWeather from './components/Korea/KrWeather';
import JpWeather from './components/Japan/JpWeather';
import KrLayout from './components/Korea/KrLayout';
import JpLayout from './components/Japan/JpLayout';
import Exchange from './components/Japan/Exchange';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route element={<KrLayout />}>
          <Route path="korea" element={<Korea />} />
          <Route path="korea/weather" element={<KrWeather />} />
        </Route>
        <Route element={<JpLayout />}>
          <Route path="japan" element={<Japan />} />
          <Route path="japan/weather" element={<JpWeather />} />
          <Route path="japan/exchange" element={<Exchange />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
