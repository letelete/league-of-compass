import './style.css';

import React from 'react';
import composeClassName from '../../../helpers/compose_classname';

const Page = ({ children, className }) => {
  return (
    <div className={composeClassName('page', { [className]: className })}>
      {children}
    </div>
  );
};

export default Page;
