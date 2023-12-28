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
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" placeholder="Alexei Ward"/>
                </div>
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input type="email" id="email" placeholder="alexei@mail.com"/>
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="+1202-555-0136"/>
                </div>


              </div>
              <div className='shipping-container'>
                <p className='sub-title'>Shipping Info</p>

              </div>
              <div className='payment-container'>
                <p className='sub-title'>Payment Details</p>

              </div>

            </div>
            <div className='checkout-summary-div'>
              <p>summary div check</p>

            </div>
        </div>  
      </div>

      </div>
      
      <TheFooter></TheFooter>
    </>
  )
}

export default CheckoutPage
