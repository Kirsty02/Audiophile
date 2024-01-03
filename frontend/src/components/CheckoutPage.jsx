import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/CheckoutPage.css';
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';
import OrderCompletePage from './OrderCompletePage';

function CheckoutPage() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); 
    };
    const goToComplete = () => {
      navigate('/order-complete');
  };
    const cartItems = useSelector(state => state.cart.items);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('e-money');
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const vat = (totalPrice / 100) * 10;
    const grandTotal = totalPrice + 50;

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

    const validateForm = () => {
      let errors = {};
      if (!name) errors.name = 'Name is required';
      if (!email) errors.email = 'Email is required';
      if (!phone) errors.phone = 'Phone number is required';
      if (!address) errors.address = 'Address is required';
      if (!zipCode) errors.zipCode = 'Zip code is required';
      if (!city) errors.city = 'City is required';
      if (!country) errors.country = 'Country is required';
      if (paymentMethod === 'e-money' && !elements.getElement(CardElement)?.complete) {
          errors.cardDetails = 'Card details are incomplete';
      }
      return errors;
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        setFieldErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
          return; 
      }

        if (paymentMethod === 'cod') {
            goToComplete();
            return;
        }

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        try {
            const paymentIntentResponse = await axios.post('/create-payment-intent', {
                amount: grandTotal * 100,
            });

            const clientSecret = paymentIntentResponse.data.clientSecret;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setErrorMessage(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    goToComplete();
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    

    const isFormValid = () => {
        return Object.keys(validateForm()).length === 0;
    };


    return (
    <>
      <Helmet>
        <style>{'body { background-color: var(--white-dark); }'}</style>
      </Helmet>
      <MyHeader></MyHeader>
      <div className='top-black-bar'> 
      </div>
      <div className='container-desktop'>
        <div className='go-back-div' onClick={goBack}>
                <p >Go Back</p>
            </div>
        <div className='checkout-container'>
        <div className='checkout-container-flex'>
            <div className='checkout-main-div'>
              <h3> Checkout</h3>
              <div className='billing-container'> 
                <p className='sub-title'>Billing Details</p>
                <div className='half-form-flex'>
                  <div class="form-group">
                    <label for="name"><p>Name</p></label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alexei Ward" />
                    {fieldErrors.name && <div className="error-message">{fieldErrors.name}</div>}
                  </div>
                  <div class="form-group">
                    <label for="email"><p>Email Address</p></label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alexi@mail.com" />
                    {fieldErrors.email && <div className="error-message">{fieldErrors.email}</div>}
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="phone"><p>Phone Number</p></label>
                  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1202-555-0136" />
                  {fieldErrors.phone && <div className="error-message">{fieldErrors.phone}</div>}
                </div>


              </div>
              <div className='shipping-container'>
                <p className='sub-title'>Shipping Info</p>
                <div class="form-group">
                  <label for="address"><p>Address</p></label>
                  <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="1137 Williams Avenue" />
                  {fieldErrors.address && <div className="error-message">{fieldErrors.address}</div>}
                </div>
                <div className='half-form-flex'>
                  <div class="form-group">
                    <label for="zip-code"><p>Zip Code</p></label>
                    <input type="text" id="zip-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="10001" />
                    {fieldErrors.zipCode && <div className="error-message">{fieldErrors.zipCode}</div>}
                  </div>
                  <div class="form-group">
                    <label for="city"><p>City</p></label>
                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="New York" />
                    {fieldErrors.city && <div className="error-message">{fieldErrors.city}</div>}
                  </div>
                </div>
                <div className='half-form'>
                  <div class="form-group">
                    <label for="country"><p>Country</p></label>
                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="United States" />
                    {fieldErrors.country && <div className="error-message">{fieldErrors.country}</div>}
                  </div>
                </div>
                
                

              </div>
              <div className='payment-container '>
                <p className='sub-title'>Payment Details</p>
                <div className='half-form-flex'>
                  <div className='form-flex-box'>
                    <p className='payment-title'>Payment Method</p>
                  </div>
                  <div class="radio-group form-flex-box">
                    <div className='radio-flex'>     
                      <input type="radio" id="e-money" name="payment-method" checked={paymentMethod === 'e-money'} onChange={() => setPaymentMethod('e-money')} />
                      <label for="e-money"><p>Debit / Credit Card </p></label>
                    </div>
                    <div className='radio-flex'>
                      <input type="radio" id="cod" name="payment-method" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                      <label for="cod"><p>Cash on Delivery</p></label>
                    </div>             
                  </div>
                </div>
                <div class="form-group">
                    <label for="city"><p>Card Details</p></label>
                    <CardElement />
                </div>

              </div>
            </div>
            <div className='checkout-summary-div'>
              <h6>Summary</h6>
              <div className='checkout-items'>
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
                            <p className='cart-grey'> x{item.quantity}</p>

                          </div>
                      </div>
                  ))}
              </div>
              <div className='bottom-summary-flex'>
                <div className='checkout-flex'>
                  <h6 className='checkout-desc'>Total</h6>
                  <h6>£ {totalPrice.toFixed(2)}</h6>
                </div>
                <div className='checkout-flex'>
                  <h6 className='checkout-desc'>Shipping</h6>
                  <h6>£ 50</h6>
                </div>
                <div className='checkout-flex'>
                  <h6 className='checkout-desc'>Vat (included)</h6>
                  <h6>£ {vat.toFixed(2)}</h6>
                </div>
                <div className='checkout-flex grand-total'>
                  <h6 className='checkout-desc'>Grand Total</h6>
                  <h6 className='grand-total-h6'>£ {grandTotal.toFixed(2)}</h6>
                </div>
      
                <form onSubmit={handleSubmit}>
                  {/* Display error message to user */}
                  {errorMessage && <div className="error-message">{errorMessage}</div>}

                  {/* Disable button based on form validity */}
                  <button type="submit" className={`orange-btn ${!isFormValid() ? 'disabled-btn' : ''}`} onClick={handleSubmit}>Continue & pay</button>
                </form>
              </div>             
            </div>
        </div>  
      </div>

      </div>

      
      <TheFooter></TheFooter>
    </>
  )
}

export default CheckoutPage
