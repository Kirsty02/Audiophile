import React, {useState, useEffect} from 'react';

import '../styles/Headphones.css'
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';
import heroimg from '../assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg'; 

function Headphones() {
    const [headphones, setHeadphones] = useState([]);

    useEffect(() => {
        fetch('/headphones')
          .then(response => response.json())
          .then(data => setHeadphones(data))
          .catch(error => console.error('Error fetching data: ', error));
      }, []);

    return (
    <>
        <MyHeader></MyHeader>
        <div className='top-black-banner'>
            <h2 className='categoryTitle'> Headphones</h2> 
        </div>
        <div className='content'>
        <div className='container-desktop'> 
                <div className='item-preview-card'>
                    <div className='item-preview-img'>


                    </div>
                    <div className='item-preview-content'>
                            <h2>XX99 Mark II Headphones </h2>
                            <p>The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your 
                                premium headphone experience by reproducing the balanced depth and 
                                precision of studio-quality sound.
                            </p>
                            <button className='orange-btn'> See product</button>
                    </div>
                </div>
            </div>

            <div className="container-desktop">
                {headphones.map((headphone, index) => (
                    <div key={index} className='item-preview-card'>
                        <div className='item-preview-img'>
                            <img className='item-preview-img-src' src={heroimg} alt="Item image" />

                        </div>
                        <div className='item-preview-content'>
                            <h3>{headphone.name}</h3>
                            <p>{headphone.description}</p>
                        </div>
                    </div>
                    
                ))}
            </div> 
        </div>
        <TheFooter></TheFooter>
    </>
  )
}

export default Headphones
