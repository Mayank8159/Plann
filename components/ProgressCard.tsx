'use client';

import { ProgressItem } from '@/lib/constants';
import { TrendingUp } from 'lucide-react';

interface ProgressCardProps {
  item: ProgressItem;
}

export default function ProgressCard({ item }: ProgressCardProps) {
  const percentage = (item.current / item.total) * 100;

  const accentColors = {
    money: 'bg-emerald-500',
    soul: 'bg-rose-500',
    curiosity: 'bg-violet-500',
  };

  const glowColors = {
    money: 'shadow-emerald-500/50',
    soul: 'shadow-rose-500/50',
    curiosity: 'shadow-violet-500/50',
  };

  return (
    <div className="glass-effect rounded-xl p-4 md:p-5 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm md:text-base font-semibold text-white mb-1">{item.name}</h3>
          <p className="text-xs md:text-sm text-slate-400">
            {item.current}{item.unit} of {item.total}{item.unit}
          </p>
        </div>
        <div className={`p-1.5 md:p-2 rounded-lg ${accentColors[item.bucket]} bg-opacity-20 flex-shrink-0`}>
          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${accentColors[item.bucket]} transition-all duration-500 rounded-full shadow-lg ${glowColors[item.bucket]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage Display */}
      <div className="mt-2 text-right">
        <span className={`text-base md:text-lg font-bold ${
          item.bucket === 'money' ? 'text-emerald-400' : 
          item.bucket === 'soul' ? 'text-rose-400' : 
          'text-violet-400'
        }`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
