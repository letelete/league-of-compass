import './style.css';

import Emoji from '../Emoji';
import React from 'react';

const ErrorDisplay = ({ title, statusCode, message }) => {
  return (
    <div className="error">
      <span className="error__header">
        {'Oh no! '}
        <Emoji symbol={'🤕'} label="Bandaged face" />
      </span>
      <div className="error__status">
        <div className="error__hint">Status</div>
        {statusCode && (
          <span className="error__status__code">{statusCode}: </span>
        )}
        <span className="error__status__title">
          {title || 'Unknown error status'}
        </span>
      </div>
      <div className="error__message">
        <div className="error__hint">Message</div>
        {message}
      </div>
    </div>
  );
};

export default ErrorDisplay;
