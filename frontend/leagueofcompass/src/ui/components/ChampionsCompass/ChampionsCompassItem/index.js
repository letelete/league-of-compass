import './style.css';

import CircularImage from '../../CircularImage';
import CompassItem from '../../Compass/CompassItem';
import React from 'react';

const ChampionsCompassItem = ({ x, y, name }) => {
  return (
    <CompassItem x={x} y={y}>
      <div className="champions-compass__item">
        <div className="champions-compass__item__avatar">
          <CircularImage
            alt={'Champion avatar'}
            src={`https://www.mobafire.com/images/avatars/${name}-classic.png`}
          />
        </div>
      </div>
    </CompassItem>
  );
};

export default ChampionsCompassItem;
