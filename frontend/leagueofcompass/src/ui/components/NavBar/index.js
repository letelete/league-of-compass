import './style.css';

import React from 'react';

const NavBar = ({ children }) => {
  return <nav className="navbar">{children}</nav>;
};

export default NavBar;
