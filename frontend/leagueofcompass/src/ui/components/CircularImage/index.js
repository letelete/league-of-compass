import './style.css';

import React from 'react';

const CircularImage = ({ src, alt }) => {
  return (
    <div className="circular-image">
      <img className="circular-image__content" src={src} alt={alt} />
    </div>
  );
};

export default CircularImage;
