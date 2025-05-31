import React from 'react';
import RainDrop from './RainDrop';
import useRainPattern from '../hooks/useRainPattern';

interface RainGridProps {
  rows: number;
  cols: number;
  speed: number;
}

const RainGrid: React.FC<RainGridProps> = ({ rows, cols, speed }) => {
  const { state } = useRainPattern(rows, cols, speed);
  
  return (
    <div 
      className="grid border border-gray-700 bg-black rounded-md overflow-hidden shadow-lg"
      style={{ 
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        aspectRatio: `${cols}/${rows}`
      }}
    >
      {state.grid.map((row, rowIndex) => (
        row.map((isActive, colIndex) => (
          <RainDrop 
            key={`${rowIndex}-${colIndex}`} 
            isActive={isActive}
            color={state.colorGrid[rowIndex][colIndex]}
          />
        ))
      ))}
    </div>
  );
};

export default RainGrid;