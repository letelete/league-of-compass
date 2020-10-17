import './style.css';

import React from 'react';

const GameBackground = ({ children }) => {
  return (
    <div className="game-background">
      <div className="game-background__filters"></div>
      <div className="game-background__content">{children}</div>
    </div>
  );
};

export default GameBackground;
