import './style.css';

import CompassAxis, { AXIS_TYPES } from '../CompassAxis';

import React from 'react';

const CompassAxisesCross = ({
  labelLeft,
  labelTop,
  labelRight,
  labelBottom,
}) => {
  return (
    <div className="compass__axises__cross">
      <CompassAxis
        axisType={AXIS_TYPES.HORIZONTAL}
        labelStart={labelLeft}
        labelEnd={labelRight}
      />
      <CompassAxis
        axisType={AXIS_TYPES.VERTICAL}
        labelStart={labelTop}
        labelEnd={labelBottom}
      />
    </div>
  );
};

export default CompassAxisesCross;
