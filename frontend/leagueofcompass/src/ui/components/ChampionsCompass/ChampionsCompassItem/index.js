import './style.css';

import CircularImage from '../../CircularImage';
import CompassItem from '../../Compass/CompassItem';
import React from 'react';

const ChampionsCompassItem = (entry) => {
  return (
    <CompassItem
      x={entry.rating.ratings.excitement}
      y={100 - entry.rating.ratings.difficulty} // Subtract from 100% to revert the axis. The higher difficulty is, the higher avatar is placed.
    >
      <div className="champions-compass__item">
        <div className="champions-compass__item__avatar">
          <CircularImage
            alt={`${entry.champion.id} avatar`}
            src={entry.champion.image}
          />
        </div>
      </div>
    </CompassItem>
  );
};

export default ChampionsCompassItem;
