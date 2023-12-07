import React from 'react';

import '../styles/BottomBanner.css'


function BottomBanner() {

  return (
    <>
        <div className='container-desktop'>
            <div className='box'> 
                <div className="left-box">
                    <h2 className='bb-header'> Bringing you the <span className="orange-text">Best</span> audio gear</h2>
                    <p className='bottom-banner-p'> Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
                        earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration
                         rooms available for you to browse and experience a wide range of our products. Stop by our 
                         store to meet some of the 
                        fantastic people who make Audiophile the best place to buy your portable audio equipment. 
                    </p>
                </div>
                <div className="right-box"></div>
            </div>

        </div>
    </>
  )
}

export default BottomBanner
