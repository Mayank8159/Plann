'use client';

import { PROGRESS_ITEMS, ROUTINES } from '@/lib/constants';
import ProgressCard from '../ProgressCard';
import DailyStack from '../DailyStack';
import RoutineToggle from '../RoutineToggle';
import { Sparkles, TrendingUp, Calendar, Target } from 'lucide-react';
import { useState } from 'react';

export default function DashboardView() {
  const [routineMode, setRoutineMode] = useState<'college' | 'deepwork'>('college');

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
          Dashboard Overview
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          Your daily progress and schedule at a glance
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <p className="text-xs md:text-sm text-slate-400">Week Progress</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">67%</p>
        </div>
        <div className="glass-effect rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-rose-400" />
            <p className="text-xs md:text-sm text-slate-400">Streak</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">12 days</p>
        </div>
        <div className="glass-effect rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-violet-400" />
            <p className="text-xs md:text-sm text-slate-400">Today's Tasks</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">8/10</p>
        </div>
        <div className="glass-effect rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <p className="text-xs md:text-sm text-slate-400">Focus Score</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">9.2</p>
        </div>
      </div>

      {/* Routine Toggle */}
      <div className="flex justify-center">
        <RoutineToggle selectedMode={routineMode} onModeChange={setRoutineMode} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Progress Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              Progress Tracking
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {PROGRESS_ITEMS.map((item) => (
                <ProgressCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Bucket Balance */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Weekly Balance</h2>
            <div className="glass-effect rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-400">Money Maker</span>
                    <span className="text-sm text-slate-400">40%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-rose-400">Soul Stuff</span>
                    <span className="text-sm text-slate-400">35%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-violet-400">Curiosity Shelf</span>
                    <span className="text-sm text-slate-400">25%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Stack */}
        <div className="lg:col-span-1">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-violet-400" />
            Today's Schedule
          </h2>
          <DailyStack routine={ROUTINES[routineMode]} />
        </div>
      </div>
    </div>
  );
}
