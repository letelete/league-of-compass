import './style.css';

import CircularImage from '../CircularImage';
import React from 'react';

const InlineTextWithImage = ({ src, alt, label }) => {
  return (
    <div className="inline-text-with-image">
      <div className="inline-text-with-image__image-wrapper">
        <CircularImage src={src} alt={alt} />
      </div>
      <p>{label}</p>
    </div>
  );
};

export default InlineTextWithImage;
