'use client';

import { Calendar, Zap } from 'lucide-react';

interface RoutineToggleProps {
  selectedMode: 'college' | 'deepwork';
  onModeChange: (mode: 'college' | 'deepwork') => void;
}

export default function RoutineToggle({ selectedMode, onModeChange }: RoutineToggleProps) {
  return (
    <div className="flex items-center gap-1 md:gap-2 glass-effect rounded-xl p-1 md:p-1.5">
      <button
        onClick={() => onModeChange('college')}
        className={`
          flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-medium transition-all duration-300 text-sm md:text-base
          ${
            selectedMode === 'college'
              ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }
        `}
      >
        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
        <span className="whitespace-nowrap">College Day</span>
        <span className="text-[10px] md:text-xs opacity-70 hidden sm:inline">(3x/week)</span>
      </button>
      
      <button
        onClick={() => onModeChange('deepwork')}
        className={`
          flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-medium transition-all duration-300 text-sm md:text-base
          ${
            selectedMode === 'deepwork'
              ? 'bg-violet-500/20 text-violet-400 shadow-lg shadow-violet-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }
        `}
      >
        <Zap className="w-3 h-3 md:w-4 md:h-4" />
        <span className="whitespace-nowrap">Deep Work Day</span>
        <span className="text-[10px] md:text-xs opacity-70 hidden sm:inline">(4x/week)</span>
      </button>
    </div>
  );
}
