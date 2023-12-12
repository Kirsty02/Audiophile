import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/CategoryWidget.css';
import headphoneWidget from '/assets/shared/desktop/image-category-thumbnail-headphones.png'; 
import speakerWidget from '/assets/shared/desktop/image-category-thumbnail-speakers.png'; 
import earphoneWidget from '/assets/shared/desktop/image-category-thumbnail-earphones.png'; 




function CategoryWidget({ closeNav }) {

    const navigate = useNavigate();

    const goToHeadphones = () => {
        navigate('/headphones');
        closeNav();
    };
    const goToSpeakers = () => {
        navigate('/speakers');
        closeNav();
        
    };
    const goToEarphones = () => {
        navigate('/earphones');
        closeNav();
    };

    return (
    <>
        <div className='container-desktop'>
            
            <div className='widget-row'>
                <div className='card' onClick={goToHeadphones}>
                    <img className='' src={headphoneWidget}/>
                    <div className='card-text'>
                        <h6>Headphones</h6>
                        <button className='no-border-btn'> Shop
                            <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5"
                            stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg> 
                        </button>
                    </div>
                </div>
                <div className='card' onClick={goToSpeakers}>
                    <img className='' src={speakerWidget}/>
                    <div className='card-text'>
                        <h6>Speakers</h6>
                        <button className='no-border-btn'> Shop
                            <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5"
                            stroke="#D87D4A" stroke-width="2" fill="none" fill-rule="evenodd"/></svg> 
                        </button>
                    </div>
                </div>
                <div className='card' onClick={goToEarphones}>
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
