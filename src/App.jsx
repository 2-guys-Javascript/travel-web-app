import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Japan from './components/Japan/Japan';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/japan' element={<Japan />}></Route>
      <Route path='/korea' element></Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  );
}

export default App;
