import React, {useState} from 'react';

import '../styles/CategoryWidget.css';
import headphoneWidget from '../assets/shared/desktop/image-category-thumbnail-headphones.png'; 
import speakerWidget from '../assets/shared/desktop/image-category-thumbnail-speakers.png'; 
import earphoneWidget from '../assets/shared/desktop/image-category-thumbnail-earphones.png'; 


function CategoryWidget() {

  return (
    <>
        <div className='container-desktop'>
            
            <div className='widget-row'>
                <div className='card'>
                    <img className='' src={headphoneWidget}/>
                    <div className='card-text'>
                        <h6>Headphones</h6>
                        <button className='no-border-btn'> Shop
                            <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5"
                            stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg> 
                        </button>
                    </div>
                </div>
                <div className='card'>
                    <img className='' src={speakerWidget}/>
                    <div className='card-text'>
                        <h6>Speakers</h6>
                        <button className='no-border-btn'> Shop
                            <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5"
                            stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg> 
                        </button>
                    </div>
                </div>
                <div className='card'>
                    <img className='' src={earphoneWidget}/>
                    <div className='card-text'>
                        <h6>Earphones</h6>
                        <button className='no-border-btn'> Shop
                            <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5"
                            stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg> 
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default CategoryWidget
