import './style.css';

import React from 'react';

const CompassWithTitles = ({ left, top, right, bottom, children }) => {
  return (
    <div className="titled-compass">
      <div className="compass__title compass__title--left">{left}</div>
      <div className="compass__title compass__title--top">{top}</div>
      <div className="compass__title compass__title--right">{right}</div>
      <div className="compass__title compass__title--bottom">{bottom}</div>
      <div className="titled-compass__content">{children}</div>
    </div>
  );
};

export default CompassWithTitles;
