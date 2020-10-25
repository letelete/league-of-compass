import './style.css';

import React from 'react';

export const AXIS_TYPES = {
  VERTICAL: 'compass__axis--vertical',
  HORIZONTAL: 'compass__axis--horizontal',
};

const CompassAxis = ({ axisType, labelStart, labelEnd }) => {
  return (
    <div className={`compass__axis ${axisType}`}>
      <div className="compass__axis__label compass__axis__label--start">
        {labelStart}
      </div>
      <div className="compass__axis__line"></div>
      <div className="compass__axis__label compass__axis__label--end">
        {labelEnd}
      </div>
    </div>
  );
};

export default CompassAxis;
