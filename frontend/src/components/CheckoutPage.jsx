import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/CheckoutPage.css';
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';






function CheckoutPage() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); 
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
                    <input type="text" id="name" placeholder="Alexei Ward"/>
                  </div>
                  <div class="form-group">
                    <label for="email"><p>Email Address</p></label>
                    <input type="email" id="email" placeholder="alexei@mail.com"/>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="phone"><p>Phone Number</p></label>
                  <input type="tel" id="phone" placeholder="+1202-555-0136"/>
                </div>


              </div>
              <div className='shipping-container'>
                <p className='sub-title'>Shipping Info</p>
                <div class="form-group">
                  <label for="address"><p>Address</p></label>
                  <input type="text" id="address" placeholder="1137 Williams Avenue"/>
                </div>
                <div className='half-form-flex'>
                  <div class="form-group">
                    <label for="zip-code"><p>Zip Code</p></label>
                    <input type="text" id="zip-code" placeholder="10001"/>
                  </div>
                  <div class="form-group">
                    <label for="city"><p>City</p></label>
                    <input type="text" id="city" placeholder="New York"/>
                  </div>
                </div>
                <div className='half-form'>
                  <div class="form-group">
                    <label for="country"><p>Country</p></label>
                    <input type="text" id="country" placeholder="United States"/>
                  </div>
                </div>
                
                

              </div>
              <div className='payment-container '>
                <p className='sub-title'>Payment Details</p>
                <div className='half-form-flex'>
                  <div className='form-flex-box'>
                    <p>Payment Method</p>
                  </div>
                  <div class="radio-group form-flex-box">
                    <div className='radio-flex'>
                      <input type="radio" id="e-money" name="payment-method" checked/>
                      <label for="e-money"><p>e-Money</p></label>
                    </div>
                    <div className='radio-flex'>
                      <input type="radio" id="cod" name="payment-method"/>
                      <label for="cod"><p>Cash on Delivery</p></label>
                    </div>             
                  </div>
                </div>
                <div className='half-form-flex'>
                  <div class="form-group">
                    <label for="zip-code"><p>e-Money Number</p></label>
                    <input type="text" id="zip-code" placeholder="10001"/>
                  </div>
                  <div class="form-group">
                    <label for="city"><p>E-Money Pin</p></label>
                    <input type="text" id="city" placeholder="New York"/>
                  </div>
                </div>
               
                
              </div>
            </div>
            <div className='checkout-summary-div'>
              <h6>Summary</h6>
              <div>
                <p> Item </p>
                <p> Item </p>
                <p> Item </p>
                <p> Item </p>
              </div>
              <div className='bottom-summary-flex'>
                <div className='checkout-flex'>
                  <h6 className='checkout-desc'>Total</h6>
                  <h6>£ .....</h6>
                </div>
                <div className='checkout-flex'>
                  <h6 className='checkout-desc'>Shipping</h6>
                  <h6>£ .....</h6>
                </div>
                <div className='checkout-flex'>
                  <h6 className='checkout-desc'>Vat (included)</h6>
                  <h6>£ .....</h6>
                </div>
                <div className='checkout-flex grand-total'>
                  <h6 className='checkout-desc'>Grand Total</h6>
                  <h6 className='grand-total-h6'>£ .....</h6>
                </div>
                
                <button className='orange-btn' > Continue & pay</button>
                
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
