'use client';

import { RoutineDay } from '@/lib/constants';
import { Clock } from 'lucide-react';

interface DailyStackProps {
  routine: RoutineDay;
}

export default function DailyStack({ routine }: DailyStackProps) {
  const bucketColors = {
    money: 'border-emerald-500 bg-emerald-500/10',
    soul: 'border-rose-500 bg-rose-500/10',
    curiosity: 'border-violet-500 bg-violet-500/10',
    general: 'border-slate-600 bg-slate-700/30',
  };

  const dotColors = {
    money: 'bg-emerald-500',
    soul: 'bg-rose-500',
    curiosity: 'bg-violet-500',
    general: 'bg-slate-500',
  };

  return (
    <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Clock className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
        <h2 className="text-lg md:text-xl font-bold text-white">
          {routine.type === 'college' ? 'College Day Schedule' : 'Deep Work Day Schedule'}
        </h2>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[9px] md:left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700" />

        {/* Schedule Items */}
        <div className="space-y-3 md:space-y-4">
          {routine.schedule.map((item, index) => (
            <div key={index} className="relative flex items-start gap-2 md:gap-4 group">
              {/* Timeline Dot */}
              <div
                className={`relative z-10 w-5 h-5 md:w-6 md:h-6 rounded-full ${dotColors[item.bucket]} flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
              </div>

              {/* Activity Card */}
              <div
                className={`
                  flex-1 p-3 md:p-4 rounded-lg border-l-2 md:border-l-4 
                  ${bucketColors[item.bucket]}
                  hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-200
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm md:text-base font-semibold text-white">{item.activity}</span>
                  <span className="text-[10px] md:text-xs text-slate-400 font-medium flex-shrink-0 ml-2">{item.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <span className="text-xs md:text-sm text-slate-400">{item.time}</span>
                  <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300">
                    {item.bucket === 'general' ? 'Break' : item.bucket.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
