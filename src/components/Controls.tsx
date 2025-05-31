import React from 'react';
import { Sliders, Play, Pause, RefreshCw, Info } from 'lucide-react';

interface ControlsProps {
  speed: number;
  setSpeed: (speed: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  resetGrid: () => void;
  rows: number;
  cols: number;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  speed, setSpeed, isPlaying, togglePlay, resetGrid,
  rows, cols, setRows, setCols
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center mb-4">
        <Sliders className="w-5 h-5 text-purple-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Controls</h2>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex justify-between text-gray-300 text-sm">
            <span>Speed: {speed.toFixed(1)}x</span>
          </label>
          <input 
            type="range" 
            min="0.1" 
            max="3" 
            step="0.1" 
            value={speed} 
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex justify-between text-gray-300 text-sm">
            <span>Grid Size: {rows}x{cols}</span>
          </label>
        </div>
        
        <div className="flex gap-2 pt-2">
          <button 
            onClick={togglePlay}
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-start gap-2">
        <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-400">
          This simulation creates a random falling rain pattern. Adjust the controls to customize the experience.
        </p>
      </div>
    </div>
  );
};

export default Controls;
