'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
        <h3 className="text-base sm:text-lg font-bold text-white">Stopwatch</h3>
      </div>

      <div className="text-4xl sm:text-5xl font-bold text-rose-400 mb-4 sm:mb-6 font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}.
        <span className="text-2xl sm:text-3xl">{String(milliseconds).padStart(2, '0')}</span>
      </div>

      <div className="flex gap-2 sm:gap-3 w-full">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 transition-all text-sm sm:text-base font-medium"
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 transition-all text-sm sm:text-base font-medium"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        )}
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/[0.08] text-white hover:bg-white/[0.12] transition-all text-sm sm:text-base font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}
