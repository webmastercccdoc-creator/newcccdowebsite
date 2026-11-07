import React from 'react';

const LoadingSpinner = ({ size = 40, color = 'text-blue-600', text = '' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <svg
        className={`animate-spin ${color}`}
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background track */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-20"
        />
        {/* Animated arc */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="90 150"
        />
      </svg>

      {text && <p className={`text-sm font-medium ${color}`}>{text}</p>}

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;