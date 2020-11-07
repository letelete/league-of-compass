import './style.css';

import CircularImage from '../CircularImage';
import React from 'react';

const InlineTextWithImage = ({ src, alt, label }) => {
  return (
    <div className="inline-text-with-image">
      <div className="inline-text-with-image__image-wrapper">
        <CircularImage src={src} alt={alt} />
      </div>
      <span>{label}</span>
    </div>
  );
};

export default InlineTextWithImage;
