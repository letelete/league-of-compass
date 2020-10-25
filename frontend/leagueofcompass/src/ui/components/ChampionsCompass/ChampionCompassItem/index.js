import CircularImage from '../../CircularImage';
import CompassItem from '../../Compass/CompassItem';
import React from 'react';

const ChampionCompassItem = ({ x, y, z, image }) => {
  return (
    <CompassItem x={x} y={y} z={z}>
      <div style={{ fontSize: '2em' }}>
        <CircularImage alt={'Champion avatar'} src={image} />
      </div>
    </CompassItem>
  );
};

export default ChampionCompassItem;
