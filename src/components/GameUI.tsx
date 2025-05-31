import React, { useState } from 'react';
import RainGrid from './RainGrid';
import Controls from './Controls';
import { Play } from 'lucide-react';

const GameUI: React.FC = () => {
  const [speed, setSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [rows, setRows] = useState<number>(15);
  const [cols, setColumns] = useState<number>(20);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGrid = () => {
    // This will trigger a re-render of the grid component
    setRows(prev => prev);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="max-w-xl p-8 bg-gray-800 bg-opacity-80 rounded-xl shadow-2xl text-center">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Digital Rain Simulator
            </h1>
            <p className="text-gray-300 mt-2">
              Experience the mesmerizing cascade of the matrix-inspired digital rain pattern
            </p>
          </div>
          
          <div className="w-full h-64 border-2 border-purple-500 rounded-lg overflow-hidden relative mb-6">
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-8">
              {Array.from({ length: 80 }).map((_, index) => (
                <div key={index} className={`border border-gray-800 ${
                  Math.random() > 0.8 ? (Math.random() > 0.5 ? 'bg-purple-600' : 'bg-blue-600') : 'bg-black'
                }`}></div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-70 p-4 rounded-lg">
                <Play className="w-16 h-16 text-purple-500" />
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            Watch as randomized colored droplets cascade down your screen, creating a unique pattern every time. Adjust speed, grid size, and more.
          </p>
          
          <button 
            onClick={() => setShowIntro(false)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Start Simulation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4">
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-lg font-bold">QB</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Digital Rain Simulator</h1>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={() => window.open('https://github.com', '_blank')} 
            className="text-gray-300 hover:text-white text-sm mr-6"
          >
            Source Code
          </button>
          <button 
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
            onClick={() => setShowIntro(true)}
          >
            Restart
          </button>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-white mb-4">Rain Pattern Visualization</h2>
              <div className="aspect-w-4 aspect-h-3">
                {isPlaying ? (
                  <RainGrid rows={rows} cols={cols} speed={speed} />
                ) : (
                  <div className="border border-gray-700 bg-black rounded-md flex items-center justify-center">
                    <div className="text-gray-400 flex flex-col items-center">
                      <Pause className="w-16 h-16 mb-2" />
                      <p>Simulation Paused</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 bg-gray-900 rounded-md p-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-400">Grid Size</p>
                    <p className="text-xl text-white">{rows} x {cols}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-400">Speed</p>
                    <p className="text-xl text-white">{speed.toFixed(1)}x</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-400">Total Cells</p>
                    <p className="text-xl text-white">{rows * cols}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-xl text-white">{isPlaying ? 'Running' : 'Paused'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Controls 
              speed={speed}
              setSpeed={setSpeed}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              resetGrid={resetGrid}
              rows={rows}
              cols={cols}
              setRows={setRows}
              setCols={setColumns}
            />
            
            <div className="mt-6 bg-gray-800 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-3">About This Project</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This interactive visualization creates a falling rain pattern similar to the iconic "digital rain" 
                seen in cyberpunk aesthetics. The colors and patterns are randomly generated, creating a unique 
                experience with each run.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium text-purple-400 mb-2">Features</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Dynamic 15x20 grid (customizable)</li>
                  <li>• Random color patterns</li>
                  <li>• Adjustable animation speed</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default GameUI;

// Add missing Pause component
const Pause: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);
