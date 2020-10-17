import './style.css';

import { NavLink } from 'react-router-dom';
import React from 'react';

const NavItem = ({ Icon, label, path }) => {
  return (
    <NavLink
      exact
      to={path}
      activeClassName="navbar__item--selected"
      className="navbar__item"
    >
      <div className="navbar__item__icon">{Icon}</div>
      <div className="navbar__item__label">{label}</div>
    </NavLink>
  );
};

export default NavItem;
