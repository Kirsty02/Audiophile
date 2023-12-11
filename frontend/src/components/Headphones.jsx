import React, {useState, useEffect} from 'react';

import '../styles/Headphones.css'
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';

//Event listening for screen width 
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth
        });
      }
      
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowSize;
  }

function Headphones() {
    const [headphones, setHeadphones] = useState([]);
    const { width } = useWindowSize(); //Using event listener

    //Fetching products and images
    useEffect(() => {
        fetch('/headphones')
          .then(response => response.json())
          .then(data => setHeadphones(data))
          .catch(error => console.error('Error fetching data: ', error));
      }, []);

    // Determine the image type based on width
    const getImageType = (width) => {
        if (width <= 640) return 'mobile';
        if (width <= 1200) return 'tablet';S
        return 'desktop';
    };

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
                {headphones.map((headphone, index) => {
                     const imageType = getImageType(width);
                     const imageUrl = headphone.images[imageType]; 
                     return(
                        <div key={index} className='item-preview-card'>
                            <div className='item-preview-img'  style={{ backgroundImage: `url(${imageUrl})` }}>
                            </div>
                            <div className='item-preview-content'>
                                <h2>{headphone.name}</h2>
                                <p>{headphone.description}</p>
                                <button className='orange-btn'> See product</button>
                            </div>
                        </div>
                     );   
                    }
                )}
            </div> 
        </div>
        <TheFooter></TheFooter>
    </>
  )
}

export default Headphones
