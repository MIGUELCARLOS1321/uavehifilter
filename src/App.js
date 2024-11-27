import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
