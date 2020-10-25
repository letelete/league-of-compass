import './style.css';

import React from 'react';
import composeClassName from '../../../helpers/compose_classname';
import { useMobileMediaQuery } from '../../hooks/useMediaQuery';

const InfoBar = ({ children }) => {
  const isMobile = useMobileMediaQuery();

  return (
    <div
      className={composeClassName('info-bar', { 'info-bar--mobile': isMobile })}
    >
      {children}
    </div>
  );
};

export default InfoBar;
