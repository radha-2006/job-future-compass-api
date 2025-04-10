
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
