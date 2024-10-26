import React from 'react';

const InnovatrLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="100"
      height="24"
      viewBox="0 0 100 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="0" y="17" fill="currentColor" fontSize="24" fontFamily="Gotham, sans-serif">
        innovatr
      </text>
      <rect x="1.5" y="-11" width="3.5" height="14" fill="#90EE90" />
    </svg>
  );
};

export default InnovatrLogo;
