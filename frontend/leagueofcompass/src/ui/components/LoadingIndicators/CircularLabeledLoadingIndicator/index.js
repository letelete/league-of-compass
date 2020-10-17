import './style.css';

import CircularLoadingIndicator from '../CircularLoadingIndicator';
import React from 'react';

const CircularLabeledLoadingIndicator = ({ label }) => {
  return (
    <div className="loading-indicator loading-indicator--circular-labeled">
      <CircularLoadingIndicator />
      <span className="loading-indicator--circular-labeled__label">
        {label}
      </span>
    </div>
  );
};

export default CircularLabeledLoadingIndicator;
