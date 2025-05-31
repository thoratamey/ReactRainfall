import { useState, useEffect, useCallback, useRef } from 'react';

type GridState = boolean[][];
type ColorGrid = string[][];

interface RainPatternState {
  grid: GridState;
  colorGrid: ColorGrid;
}

const COLORS = ['bg-blue-600', 'bg-blue-700', 'bg-purple-600', 'bg-purple-700'];

const useRainPattern = (rows: number, cols: number, speed: number = 1) => {
  const [state, setState] = useState<RainPatternState>({
    grid: Array(rows).fill(null).map(() => Array(cols).fill(false)),
    colorGrid: Array(rows).fill(null).map(() => Array(cols).fill(''))
  });
  
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Create a new drop at the top row
  const createNewDrop = useCallback(() => {
    setState(prevState => {
      const newGrid = [...prevState.grid];
      const newColorGrid = [...prevState.colorGrid];
      
      // Generate new drops in the top row with some randomness
      for (let col = 0; col < cols; col++) {
        if (Math.random() < 0.1) { // 10% chance for each column
          newGrid[0][col] = true;
          newColorGrid[0][col] = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
      }
      
      return { grid: newGrid, colorGrid: newColorGrid };
    });
  }, [cols]);

  // Move drops down
  const updateRainPattern = useCallback(() => {
    setState(prevState => {
      const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(false));
      const newColorGrid = Array(rows).fill(null).map(() => Array(cols).fill(''));
      
      // Move all active drops down one row
      for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols; col++) {
          if (prevState.grid[row][col]) {
            newGrid[row + 1][col] = true;
            newColorGrid[row + 1][col] = prevState.colorGrid[row][col];
          }
        }
      }
      
      // Copy the top row from the previous state
      for (let col = 0; col < cols; col++) {
        if (prevState.grid[0][col]) {
          newGrid[0][col] = true;
          newColorGrid[0][col] = prevState.colorGrid[0][col];
        }
      }
      
      return { grid: newGrid, colorGrid: newColorGrid };
    });
    
    // Random chance to create new drops
    if (Math.random() < 0.3) { // 30% chance each update
      createNewDrop();
    }
  }, [rows, cols, createNewDrop]);

  // Animation frame handler
  const animateRain = useCallback((timestamp: number) => {
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - lastUpdateTimeRef.current;
    const frameDelay = 1000 / (speed * 2); // Speed factor
    
    if (elapsed > frameDelay) {
      updateRainPattern();
      lastUpdateTimeRef.current = timestamp;
    }
    
    animationRef.current = requestAnimationFrame(animateRain);
  }, [updateRainPattern, speed]);

  // Start/stop animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateRain);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateRain]);

  return { state };
};

export default useRainPattern;