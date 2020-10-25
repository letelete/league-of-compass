import './style.css';

import React from 'react';
import composeClassName from '../../../../helpers/compose_classname';

const InlineDropdownItem = ({
  id,
  view,
  onSelected,
  isSelected,
  isDisabled,
}) => {
  return (
    <div
      className={composeClassName(
        'inline-dropdown__menu__item',
        { 'inline-dropdown__menu__item--selected': isSelected },
        { 'inline-dropdown__menu__item--disabled': isDisabled }
      )}
      onClick={isDisabled ? null : () => onSelected(id)}
    >
      {view}
    </div>
  );
};

export default InlineDropdownItem;
