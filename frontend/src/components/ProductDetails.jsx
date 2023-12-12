import React, {useState, useEffect} from 'react';

import '../styles/ProductDetails.css';
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';
import CategoryWidget from './CategoryWidget';
import BottomBanner from './BottomBanner';



function ProductDetails() {
    const [quantity, setQuantity] = useState(1);


    const increaseValue = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseValue = () => {
        setQuantity(prevQuantity => prevQuantity - 1 < 1 ? 1 : prevQuantity - 1);
    };



    return (
    <>
        <MyHeader></MyHeader>
        <div className='top-black-bar'> 
        </div>
        <div className='container-desktop'>

            <div className='product_preview'>
                <div className='product_preview_image'></div>
                <div className='product_preview_info'>
                    <h3 className='overline'>NEW preduct</h3>
                    <h2> XX99 Mark II Headphones</h2>
                    <p> The new XX99 Mark II headphones is the pinnacle of pristine audio. 
                        It redefines your premium headphone experience by reproducing the balanced
                         depth and precision of studio-quality sound.
                    </p>
                    <h6> $ 2,999</h6>
                    <div className='product_cart_btn_flex'>
                        <div class="quantity-selector">
                            <button className="decrease" onClick={decreaseValue}>-</button>
                            <input type="text" id="quantity" value={quantity} readOnly/>
                            <button className="increase" onClick={increaseValue}>+</button>
                        </div>
                        <button className='orange-btn'> Add to cart</button>
                    </div>
                </div>
            </div>
            <div className='features_includes_box'>
                <div className='features_box'>
                    <h4> Features</h4>
                    <p>Featuring a genuine leather head strap and premium earcups, these headphones deliver 
                        superior comfort for those who like to enjoy endless listening. It includes intuitive
                         controls designed for any situation. Whether you’re taking a business call or just in
                          your own personal space,
                         the auto on/off and pause features ensure that you’ll never miss a beat.
                    </p>
                    <p>
                        The advanced Active Noise Cancellation with built-in equalizer allow you to experience
                         your audio 
                        world on your terms. It lets you enjoy your audio in peace, but quickly interact with
                         your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity
                          and 17 hour battery life, the XX99 Mark II headphones gives you superior sound,
                           cutting-edge technology, and a modern design aesthetic. </p>

                </div>
                <div className='includes_box'>
                    <h4> In the box </h4> 
                    <ul className='box-list'>
                        <li> <span className='quantity'>1x</span> <p> Headphone unit</p></li>
                        <li> <span className='quantity'>4x</span> <p> Replacement Earcuops</p></li>
                        <li> <span className='quantity'>1x</span>  <p> User Manual</p></li>
                        <li> <span className='quantity'>2x</span>  <p> 3.5mm 5m Audio Cabel</p></li>
                        <li> <span className='quantity'>1x</span>  <p> Travel Bag</p></li>
                    </ul>

                </div>

            </div>
            <div className='product-gallery'>
                <div className='two-img-flex'> 
                    <div className="top-img"></div>
                    <div className="bottom-img"></div>
                </div>
                <div className='large-img'>  
                </div>
            </div>

            <div className='others-contaienr'>
                <h4> You may also like</h4>
                <div className='others-flex'>
                    <div className='others-card'>
                        <div className='others-img'></div>
                        <h6>XX9 MARK 11</h6>
                        <button className='orange-btn'> See product</button>
                    </div>
                    <div className='others-card'>
                        <div className='others-img'></div>
                        <h6>XX9 MARK 11</h6>
                        <button className='orange-btn'> See product</button>
                    </div>
                    <div className='others-card'>
                        <div className='others-img'></div>
                        <h6>XX9 MARK 11</h6>
                        <button className='orange-btn'> See product</button>
                    </div>
    

                </div>

            </div>
        </div>
     
        <CategoryWidget></CategoryWidget>
        <BottomBanner></BottomBanner>
        <TheFooter></TheFooter>
    </>
  )
}

export default ProductDetails
