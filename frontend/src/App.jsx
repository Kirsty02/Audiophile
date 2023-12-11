import './App.css'
import Home from './components/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './components/CategoryPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headphones" element={<CategoryPage category="headphones" />} />
        <Route path="/speakers" element={<CategoryPage category="speakers" />} />
        <Route path="/earphones" element={<CategoryPage category="earphones" />} />
      </Routes>
    </Router>
  );
}
export default App
