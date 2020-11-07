import './style.css';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  animated,
  config,
  useChain,
  useSpring,
  useTransition,
} from 'react-spring';

import { FoldDownIcon } from '../../icons';
import InlineDropdownItem from './InlineDropdownMenuItem';
import composeClassName from '../../../helpers/compose_classname';
import { useMobileMediaQuery } from '../../hooks/useMediaQuery';

const InlineDropdown = ({ onSelected, items, selectedId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobileView = useMobileMediaQuery();

  const currentItem = useMemo(
    () => items.find((item) => item.id === selectedId),
    [items, selectedId]
  );

  const springRef = useRef();
  const transRef = useRef();

  const menuSpring = useSpring({
    ref: springRef,
    config: config.wobbly,
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 },
  });

  const transitions = useTransition(isOpen ? items : [], (item) => item.id, {
    ref: transRef,
    unique: true,
    trail: 200 / items.length,
    config: config.stiff,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });

  const handleDropdownToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleItemSelected = (id) => {
    onSelected(id);
    setIsOpen(false);
  };

  const startListeningForOutsideClick = () => {
    document.onmousedown = () => setIsOpen(false);
  };

  const stopListeningForOutsideClick = () => {
    document.onmousedown = null;
  };

  useEffect(() => {
    return () => {
      stopListeningForOutsideClick();
    };
  });

  useChain(isOpen ? [springRef, transRef] : [transRef, springRef], [
    0,
    isOpen ? 0 : 0.15,
  ]);

  return (
    <div
      className={composeClassName('inline-dropdown', {
        'inline-dropdown--mobile': isMobileView,
      })}
      onMouseLeave={startListeningForOutsideClick}
      onMouseEnter={stopListeningForOutsideClick}
    >
      <div className="inline-dropdown__selected" onClick={handleDropdownToggle}>
        {currentItem.view}
        <FoldDownIcon
          style={{
            transition: 'transform 0.25s ease-out',
            transform: `scale(${isOpen ? '-1' : '1'})`,
          }}
        />
      </div>
      <animated.div
        className="inline-dropdown__menu"
        style={{
          opacity: menuSpring.opacity,
        }}
      >
        {transitions.map(({ key, item, props }) => (
          <animated.div
            key={key}
            style={{
              transformOrigin: 'left center',
              ...props,
            }}
          >
            <InlineDropdownItem
              isSelected={item.id === selectedId}
              onSelected={() => handleItemSelected(item.id)}
            >
              {item.view}
            </InlineDropdownItem>
          </animated.div>
        ))}
      </animated.div>
    </div>
  );
};

export default InlineDropdown;
