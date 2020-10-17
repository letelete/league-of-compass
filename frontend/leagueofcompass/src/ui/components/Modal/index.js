import './style.css';

import React from 'react';
import composeClassName from '../../../helpers/compose_classname';

const Modal = ({ children, className }) => {
  return (
    <div className={composeClassName('modal', { [className]: className })}>
      {children}
    </div>
  );
};

export default Modal;
