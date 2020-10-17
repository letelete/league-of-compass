import './style.css';

import React from 'react';

const TopBar = ({ children }) => {
  return <header className="top-bar">{children}</header>;
};

export default TopBar;
