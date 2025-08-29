import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-[100]">

      {/* Donut-shaped spinner with gradient border */}
      <div className="relative flex items-center justify-center h-20 w-20">
        {/* Gradient border using a pseudo-element */}
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, #00854d, white)',
            mask: 'radial-gradient(transparent 65%, black 66%)',
            WebkitMask: 'radial-gradient(transparent 65%, black 66%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;