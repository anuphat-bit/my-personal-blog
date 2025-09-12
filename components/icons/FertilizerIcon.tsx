import React from 'react';

const FertilizerIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-6 w-6" 
      viewBox="0 0 24 24" 
      strokeWidth="1.5" 
      stroke="currentColor" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 21a6.05 6.05 0 0 0 6 -6a9 9 0 0 0 -6 -12a9 9 0 0 0 -6 12a6.05 6.05 0 0 0 6 6z" />
      <path d="M12 15a4 4 0 0 0 2 -3.456" />
      <path d="M12 9v.01" />
      <path d="M10 11.5a4 4 0 0 0 2 3.456" />
    </svg>
  );
};

export default FertilizerIcon;
