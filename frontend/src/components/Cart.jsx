import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateItemQuantity, clearCart } from '../features/cart/cartSlice';

import '../styles/Cart.css';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    //Total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    function abbreviateProductName(name) {
        let abbreviatedName = name.replace("Mark", "MK");
        const wordsToRemove = ["Headphones", "Speaker", "Wireless Earphones"];
        for (const word of wordsToRemove) {
            if (abbreviatedName.endsWith(word)) {
                return abbreviatedName.replace(word, "").trim(); 
            }
        }
        return abbreviatedName;
    }

    const handleIncreaseQuantity = (id) => {
        const item = cartItems.find(item => item.id === id);
        dispatch(updateItemQuantity({ id: id, quantity: item.quantity + 1 }));
    };

    const handleDecreaseQuantity = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item.quantity > 1) {
            dispatch(updateItemQuantity({ id: id, quantity: item.quantity - 1 }));
        }else {
            if (window.confirm("Are you sure you want to remove this item from the cart?")) {
                dispatch(removeFromCart(id));
            }
        }
    };

    const handleRemoveAll = () => {
        if (window.confirm("Are you sure you want to remove this item from the cart?")) {
            dispatch(clearCart());
        }
        
    };

    const navigate = useNavigate();

    const goToCheckoutPage = () => {
        navigate('/checkoutPage');
    };

    return (
    <>
        <div className='container-desktop flex-column'>
            <div className='cart-container'>
                <div className='cart-top'>
                    <h6> Cart ({cartItems.length})</h6>
                    <p className='remove-text' onClick={handleRemoveAll}> <u>Remove All</u></p>
                </div>
                <div className='cart-items'>
                    {cartItems.map((item, index) => (
                        <div key={index} className='cart-item'>
                            <div className='left-item'> 
                                <div className='cart-img' style={{ backgroundImage: `url(${item.image})` }}></div>
                                <div className='cart-info'> 
                                    <h6 className='cart-item-title'>{abbreviateProductName(item.name)}</h6>
                                    <p className='cart-grey'>£ {item.price}</p>
                                </div>
                            </div>
                            <div className='right-item'> 
                                <div className="quantity-selector">
                                    <button className="decrease" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                    <input type="text" value={item.quantity} readOnly/>
                                    <button className="increase" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}  
                </div>
                <div className='go-checkout-div'> 
                    <div className='total-flex'>
                        <p className='cart-grey'> TOTAL </p>
                        <h6 > £ {totalPrice.toFixed(2)}</h6>
                    </div>
                    <button className='orange-btn' onClick={goToCheckoutPage}> Checkout</button>
                </div>
            </div>
        </div>      
    </>
  )
}

export default Cart
