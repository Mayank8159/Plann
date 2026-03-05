'use client';

import { useState } from 'react';
import { ROUTINES } from '@/lib/constants';
import DailyStack from '../DailyStack';
import RoutineToggle from '../RoutineToggle';
import { Calendar, Clock, Zap, CheckCircle2, Plus } from 'lucide-react';

export default function RoutineView() {
  const [routineMode, setRoutineMode] = useState<'college' | 'deepwork'>('college');

  const weekSchedule = [
    { day: 'Monday', type: 'college' as const, active: true },
    { day: 'Tuesday', type: 'deepwork' as const, active: true },
    { day: 'Wednesday', type: 'college' as const, active: true },
    { day: 'Thursday', type: 'deepwork' as const, active: true },
    { day: 'Friday', type: 'college' as const, active: true },
    { day: 'Saturday', type: 'deepwork' as const, active: true },
    { day: 'Sunday', type: 'deepwork' as const, active: false },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3">
          <Calendar className="w-6 h-6 md:w-8 md:h-8 text-violet-400" />
          Weekly Routine
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          Manage your daily schedules and optimize your time
        </p>
      </div>

      {/* Week Overview */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          This Week's Plan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {weekSchedule.map((day, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${day.active 
                  ? day.type === 'college'
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-violet-500/50 bg-violet-500/10'
                  : 'border-slate-700 bg-slate-800/30 opacity-50'
                }
              `}
            >
              <p className="text-xs md:text-sm font-medium text-slate-400 mb-1">{day.day}</p>
              <div className="flex items-center gap-2">
                {day.type === 'college' ? (
                  <Calendar className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Zap className="w-4 h-4 text-violet-400" />
                )}
                <p className={`text-xs md:text-sm font-semibold ${
                  day.type === 'college' ? 'text-emerald-400' : 'text-violet-400'
                }`}>
                  {day.type === 'college' ? 'College' : 'Deep Work'}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>College Days (3x/week)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-violet-500" />
            <span>Deep Work Days (4x/week)</span>
          </div>
        </div>
      </div>

      {/* Routine Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-effect rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-slate-400" />
          <div>
            <p className="text-sm font-semibold text-white">View Schedule</p>
            <p className="text-xs text-slate-400">Switch between day types to preview</p>
          </div>
        </div>
        <RoutineToggle selectedMode={routineMode} onModeChange={setRoutineMode} />
      </div>

      {/* Daily Schedule View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Timeline */}
        <div className="lg:col-span-2">
          <DailyStack routine={ROUTINES[routineMode]} />
        </div>

        {/* Schedule Stats */}
        <div className="space-y-4">
          {/* Time Breakdown */}
          <div className="glass-effect rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-4">Time Breakdown</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Money Maker</span>
                  <span className="text-sm font-semibold text-emerald-400">6.5h</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '43%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Soul Stuff</span>
                  <span className="text-sm font-semibold text-rose-400">3.5h</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: '23%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Curiosity Shelf</span>
                  <span className="text-sm font-semibold text-violet-400">3h</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500" style={{ width: '20%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Break/Sleep</span>
                  <span className="text-sm font-semibold text-slate-400">11h</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600" style={{ width: '46%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Habits Tracker */}
          <div className="glass-effect rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Today's Habits
            </h3>
            <div className="space-y-2">
              {[
                { task: 'Morning Workout', done: true },
                { task: 'Deep Work Session', done: true },
                { task: 'German Study', done: false },
                { task: 'Evening Reflection', done: false },
              ].map((habit, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    habit.done ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-slate-800/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    habit.done ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'
                  }`}>
                    {habit.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-sm ${habit.done ? 'text-white font-medium' : 'text-slate-400'}`}>
                    {habit.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-violet-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all group">
            <Plus className="w-5 h-5 text-emerald-400 group-hover:rotate-90 transition-transform" />
            <span className="text-white font-medium">Customize Routine</span>
          </button>
        </div>
      </div>
    </div>
  );
}
