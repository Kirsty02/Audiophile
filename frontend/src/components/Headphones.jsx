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
        if (width <= 1200) return 'tablet';
        return 'desktop';
    };

    return (
    <>
        <MyHeader></MyHeader>
        <div className='top-black-banner'>
            <h2 className='categoryTitle'> Headphones</h2> 
        </div>
        <div className='content'>
            <div className="container-desktop">
                {headphones.map((headphone, index) => {
                     // Determine the layout based on the index
                     const layoutClass = index % 2 === 0 ? "item-flex" : "item-flex-reverse";
                     const imageType = getImageType(width);
                     const imageUrl = headphone.images[imageType]; 
                     return(
                        <div key={headphone.product_id} className={`item-preview-card ${layoutClass}`}>
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
