import React from 'react';

interface RainDropProps {
  isActive: boolean;
  color: string;
}

const RainDrop: React.FC<RainDropProps> = ({ isActive, color }) => {
  return (
    <div
      className={`w-full h-full border border-gray-800 transition-colors duration-300 ${
        isActive ? color : 'bg-black'
      }`}
    />
  );
};

export default RainDrop;