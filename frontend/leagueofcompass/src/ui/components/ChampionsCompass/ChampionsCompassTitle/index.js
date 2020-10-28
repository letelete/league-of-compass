import './style.css';

import CircularImage from '../../CircularImage';
import React from 'react';

const ChampionsCompassTitle = ({ label }) => {
  return (
    <div className="champions-compass__title">
      <div className="champions-compass__title__label">{label}</div>
    </div>
  );
};

export default ChampionsCompassTitle;
