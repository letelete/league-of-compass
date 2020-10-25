import './style.css';

import CompassAxis, { AXIS_TYPES } from '../CompassAxis';

import React from 'react';

const CompassAxisesCross = () => {
  return (
    <div className="compass__axises">
      <CompassAxis axisType={AXIS_TYPES.HORIZONTAL} />
      <CompassAxis axisType={AXIS_TYPES.VERTICAL} />
    </div>
  );
};

export default CompassAxisesCross;
