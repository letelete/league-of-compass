import './style.css';

import CompassAxisesCross from './CompassAxisesCross';
import CompassLabel from './CompassLabel';
import React from 'react';

const Compass = ({
  children,
  labelLeft,
  labelTop,
  labelRight,
  labelBottom,
}) => {
  return (
    <div className="compass">
      <div className="compass__data">{children}</div>
      <CompassAxisesCross
        {...{
          labelLeft,
          labelTop,
          labelRight,
          labelBottom,
        }}
      />
    </div>
  );
};

export default Compass;
