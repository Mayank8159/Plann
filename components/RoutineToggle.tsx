'use client';

import { Calendar, Zap } from 'lucide-react';

interface RoutineToggleProps {
  selectedMode: 'college' | 'deepwork';
  onModeChange: (mode: 'college' | 'deepwork') => void;
}

export default function RoutineToggle({ selectedMode, onModeChange }: RoutineToggleProps) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 premium-card rounded-lg sm:rounded-xl p-1 sm:p-1.5">
      <button
        onClick={() => onModeChange('college')}
        className={`
          flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm md:text-base
          ${
            selectedMode === 'college'
              ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20'
              : 'text-white/60 hover:text-white/80 hover:bg-white/5'
          }
        `}
      >
        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="whitespace-nowrap">College</span>
        <span className="text-[10px] sm:text-xs opacity-70 hidden sm:inline">(3x)</span>
      </button>
      
      <button
        onClick={() => onModeChange('deepwork')}
        className={`
          flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm md:text-base
          ${
            selectedMode === 'deepwork'
              ? 'bg-violet-500/20 text-violet-400 shadow-lg shadow-violet-500/20'
              : 'text-white/60 hover:text-white/80 hover:bg-white/5'
          }
        `}
      >
        <Zap className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="whitespace-nowrap">Deep Work</span>
        <span className="text-[10px] sm:text-xs opacity-70 hidden sm:inline">(4x)</span>
      </button>
    </div>
  );
}
