import React, {useState} from 'react';

import '../styles/Home.css'
import heroimg from '../assets/home/tablet/image-header.jpg'; 
import imageSpeaker from '../assets/home/desktop/image-speaker-zx9.png'; 
import CategoryWidget from './CategoryWidget';
import BottomBanner from './BottomBanner';
import TheFooter from './TheFooter';

function Home() {

  return (
    <>
        <div className='hero-container'>
            <div className='hero-content'>
                <div className='left-hero' >
                    <h1 className='overline'> NEW PRODUCT</h1>
                    <h1 className='speaker-title'> XX99 Mark II Headphones</h1>
                    <p className='hero-text'> Experience natural, lifelike audio and exceptional
                        build quality made for the passionate music enthusiast.
                    </p>
                    <button className='orange-btn'> See Product</button>
                </div>
                <div className='right-hero'>
                    <img className='hero-img' src={heroimg}/>
                </div>
            </div>

            <CategoryWidget></CategoryWidget>
            <div className='container-desktop'>
                <div className='home-gallery'>
                    <div className='top-box'>
                        <div className='image-container'> 
                            <div className='extra-ring-container'> 
                                <img src={imageSpeaker}/>
                            </div>
                            
                        </div>
                        <div className='top-right-box'>
                            <h1 className='speaker-title'> zx9 Speaker</h1>
                            <p> Upgrade to premium speakers that are phenomenally
                                 built to deliver truly remarkable sound.
                            </p>
                            <button className='black-btn'> See Product</button>
                        </div>
                    </div>
                    <div className='middle-box'>
                        <h4> Zx7 Speaker</h4>
                        <button className='black-btn-reverse'> See Product</button>
                    </div>
                    <div className='bottom-box'>
                        <div className='bottom-left-box'>
                 
                        </div>
                        <div className='bottom-right-box'>
                            <h4> YX1 Erphones</h4>
                            <button className='black-btn-reverse'> See Product</button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBanner></BottomBanner>
            <TheFooter></TheFooter>
            
        </div>
    </>
  )
}

export default Home
