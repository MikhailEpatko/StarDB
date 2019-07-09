import React from 'react';

import './error-indicator.css';
import icon from './icon.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon}
           alt="error icon" />
      <span className="boom">BOOM!</span>
      <span>something went wrong</span>
      <span>but R2-D2 is fixing it</span>
    </div>
  );
};

export default ErrorIndicator;