import './style.css';

import React from 'react';

export const AXIS_TYPES = {
  VERTICAL: 'compass__axis--vertical',
  HORIZONTAL: 'compass__axis--horizontal',
};

const CompassAxis = ({ axisType }) => {
  return <div className={`compass__axis ${axisType}`}></div>;
};

export default CompassAxis;
