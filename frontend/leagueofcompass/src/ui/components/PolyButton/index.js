import './style.css';

import POLY_STATES, { isPolyState } from './poly_states';

import CircularLoadingIndicator from '../LoadingIndicators/CircularLoadingIndicator';
import React from 'react';
import composeClassName from '../../../helpers/compose_classname';

const PolyButton = ({ onClick, polyState, label }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div className="poly-button-wrapper">
      {polyState === POLY_STATES.LOADING && (
        <div className="poly-button__indicator">
          <CircularLoadingIndicator />
        </div>
      )}
      <div
        className={composeClassName(
          'poly-button',
          { 'poly-button--clickable': onClick },
          { [polyState]: isPolyState(polyState) }
        )}
        onClick={onClick && handleButtonClick}
      >
        <span className="poly-button__label">{label || '...'}</span>
      </div>
    </div>
  );
};

export default PolyButton;
