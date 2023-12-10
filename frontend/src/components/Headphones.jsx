import React, {useState, useEffect} from 'react';

import '../styles/Headphones.css'
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';

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
            <div className="headphones-container">
                {headphones.map((headphone, index) => (
                    <div key={index} className="headphone-card">
                    <h3>{headphone.name}</h3>
                    <p>{headphone.description}</p>
                    </div>
                ))}
            </div> 
        </div>
        <TheFooter></TheFooter>
    </>
  )
}

export default Headphones
