import './App.css'
import Home from './components/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headphones from './components/Headphones.jsx'; 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headphones" element={<Headphones />} />
        // Add other routes as needed
      </Routes>
    </Router>
  );
}
export default App
