'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('25');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              setIsRunning(false);
              return 0;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    const newMins = parseInt(inputMinutes) || 25;
    setMinutes(newMins);
    setSeconds(0);
  };

  const handleSetMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputMinutes(val);
    if (!isRunning) {
      const newMins = parseInt(val) || 0;
      setMinutes(newMins);
      setSeconds(0);
    }
  };

  return (
    <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
        <h3 className="text-base sm:text-lg font-bold text-white">Timer</h3>
      </div>
      
      <div className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-4 sm:mb-6 font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="w-full mb-4 sm:mb-6">
        <label className="text-xs text-white/60 mb-2 block">Minutes</label>
        <input
          type="number"
          value={inputMinutes}
          onChange={handleSetMinutes}
          disabled={isRunning}
          min="0"
          max="999"
          className="w-full px-3 sm:px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-center text-sm sm:text-base disabled:opacity-50 focus:border-emerald-400/50 transition-colors"
        />
      </div>

      <div className="flex gap-2 sm:gap-3 w-full">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all text-sm sm:text-base font-medium"
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
