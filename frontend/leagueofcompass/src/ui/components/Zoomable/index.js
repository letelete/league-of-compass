import './style.css';

import React from 'react';

const Zoomable = ({ children, panZoomRef }) => {
  return (
    <div className="zoomable">
      <div className="zoomable__ref-holder" ref={panZoomRef}>
        {children}
      </div>
    </div>
  );
};

export default Zoomable;
