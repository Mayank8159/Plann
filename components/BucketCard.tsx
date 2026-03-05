'use client';

import { Bucket } from '@/lib/constants';
import { ChevronRight } from 'lucide-react';

interface BucketCardProps {
  bucket: Bucket;
}

export default function BucketCard({ bucket }: BucketCardProps) {
  const accentColors = {
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 hover:border-emerald-500/50',
    rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/30 hover:border-rose-500/50',
    violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/30 hover:border-violet-500/50',
  };

  const textColors = {
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
    violet: 'text-violet-400',
  };

  const iconColors = {
    emerald: 'text-emerald-500',
    rose: 'text-rose-500',
    violet: 'text-violet-500',
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 
        bg-gradient-to-br ${accentColors[bucket.accentColor as keyof typeof accentColors]}
        border backdrop-blur-md
        transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] md:hover:scale-[1.02]
        group
      `}
    >
      {/* Header */}
      <div className="mb-3 md:mb-4">
        <h2 className={`text-xl md:text-2xl font-bold mb-2 ${textColors[bucket.accentColor as keyof typeof textColors]}`}>
          {bucket.name}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm">{bucket.description}</p>
      </div>

      {/* Activities */}
      <div className="space-y-2 md:space-y-3">
        {bucket.activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group/activity"
            >
              <div className={`p-1.5 md:p-2 rounded-lg bg-slate-700/50 ${iconColors[bucket.accentColor as keyof typeof iconColors]}`}>
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-semibold text-white mb-1">{activity.name}</h3>
                <p className="text-[11px] md:text-xs text-slate-400">{activity.description}</p>
                {activity.subActivities && (
                  <div className="mt-1.5 md:mt-2 flex flex-wrap gap-1.5 md:gap-2">
                    {activity.subActivities.map((sub) => (
                      <span
                        key={sub.id}
                        className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs rounded-md bg-slate-700/50 text-slate-300"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-slate-600 group-hover/activity:text-slate-400 transition-colors flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
