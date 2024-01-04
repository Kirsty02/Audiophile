import React from 'react';
import '../styles/OrderComplete.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';

function OrderCompletePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToHome = () => {
        dispatch(clearCart());
        navigate('/');
    };
 
    return (
    <>
        <div className='content-flex'>
            <div className='complete-div'>
                <h1>Order Complete</h1>
                <h3 >Your order has been successfully processed!</h3>
                <h4> Order id: 144568835</h4>
                <h6>An email invoice will be sent shortly to: john@mail.com</h6>
                <button className='orange-btn' onClick={goToHome}> Back to Website</button>
            </div>
        </div>
    </>
  )
}

export default OrderCompletePage
