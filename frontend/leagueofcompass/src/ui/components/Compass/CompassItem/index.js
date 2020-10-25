import './style.css';

import { animated, config, interpolate, useSpring } from 'react-spring';

import React from 'react';

const CompassItem = ({ children, x, y }) => {
  const { o, left, top } = useSpring({
    config: config.gentle,
    from: { o: 0, left: 50, top: 50 },
    left: x,
    top: y,
    o: 1,
  });

  return (
    <animated.div
      className="compass__item"
      style={{
        opacity: o.interpolate({
          range: [0, 0.5, 1],
          output: [0, 0.1, 1],
        }),
        transform: o
          .interpolate({
            range: [0, 0.25, 1],
            output: [0, 1.25, 1],
          })
          .interpolate((o) => `scale(${o})`),
        top: top.interpolate((top) => `${top}%`),
        left: `${x}%`,
      }}
    >
      {children}
    </animated.div>
  );
};

export default CompassItem;
