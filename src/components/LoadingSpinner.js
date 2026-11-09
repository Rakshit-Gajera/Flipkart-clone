// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'spinner-sm',
    medium: 'spinner-md',
    large: 'spinner-lg'
  };

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
