import ErrorDisplay from '../components/ErrorDisplay';
import React from 'react';

const useErrorDisplay = (error, Child) => {
  if (error) return <ErrorDisplay {...error} />;
  return Child;
};

export default useErrorDisplay;
