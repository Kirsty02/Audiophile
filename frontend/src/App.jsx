import React, { useEffect } from 'react';
import './App.css'
import Home from './components/Home.jsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CategoryPage from './components/CategoryPage';
import ProductDetails from './components/ProductDetails.jsx';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headphones" element={<CategoryPage category="headphones" />} />
        <Route path="/speakers" element={<CategoryPage category="speakers" />} />
        <Route path="/earphones" element={<CategoryPage category="earphones" />} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}
export default App
