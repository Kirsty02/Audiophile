import React, { useEffect } from 'react';
import './App.css'
import Home from './components/Home.jsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CategoryPage from './components/CategoryPage';
import ProductDetails from './components/ProductDetails.jsx';
import CheckoutPage from './components/checkoutPage.jsx';
import OrderCompletePage from './components/OrderCompletePage.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const stripePromise = loadStripe('pk_live_51OUDykHx0vDLdlo3LB9qItA3NvDfjWp7ghtk16oigkF1BTcqklJQESpMYZJY6OkBSunnOPIPizLXDLPLbFeXaLSn00bVPvO3jn');
 
function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/headphones" element={<CategoryPage category="headphones" />} />
          <Route path="/speakers" element={<CategoryPage category="speakers" />} />
          <Route path="/earphones" element={<CategoryPage category="earphones" />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/checkoutPage" element={<CheckoutPage/>} />
          <Route path="/order-complete" element={<OrderCompletePage />} />
        </Routes>
      </Router>
    </Elements>
  );
}
export default App
