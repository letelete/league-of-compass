import './style.css';

import React from 'react';
import composeClassName from '../../../../helpers/compose_classname';

const InlineDropdownItem = ({ onSelected, isSelected, children }) => {
  return (
    <div
      className={composeClassName('inline-dropdown__menu__item', {
        'inline-dropdown__menu__item--selected': isSelected,
      })}
      onClick={onSelected}
    >
      {children}
    </div>
  );
};

export default InlineDropdownItem;
