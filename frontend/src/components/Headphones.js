import React, { useEffect, useState } from 'react';

function Headphones() {
  const [headphones, setHeadphones] = useState([]);

  useEffect(() => {
    fetch('/headphones')
      .then(response => response.json())
      .then(data => setHeadphones(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="headphones-container">
      {headphones.map((headphone, index) => (
        <div key={index} className="headphone-card">
          {/* Display headphone details here */}
        </div>
      ))}
    </div>
  );


}