import React from 'react';
import './FacialRecognition.css';

const FacialRecognition = ({ box, imageUrl }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
        {box && Object.keys(box).length > 0 && (
          <div
            className='bounding-box'
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FacialRecognition;