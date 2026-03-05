'use client';

import { useState, useEffect } from 'react';
import { ROUTINES } from '@/lib/constants';
import DailyStack from '../DailyStack';
import RoutineToggle from '../RoutineToggle';
import { Calendar, Clock, Zap, CheckCircle2, Plus, Edit2, Save, X, AlertCircle, Check } from 'lucide-react';

export default function RoutineView() {
  const [routineMode, setRoutineMode] = useState<'college' | 'deepwork'>('college');
  const [selectedDay, setSelectedDay] = useState(0);

  // Initialize habits from localStorage or use default values
  const [habits, setHabits] = useState<Record<number, { workout: boolean; focus: boolean; study: boolean; reflection: boolean }>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dailyHabits');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored habits', e);
        }
      }
    }
    return {
      0: { workout: true, focus: true, study: false, reflection: false },
      1: { workout: false, focus: true, study: false, reflection: false },
      2: { workout: true, focus: true, study: true, reflection: false },
      3: { workout: true, focus: true, study: false, reflection: true },
      4: { workout: false, focus: true, study: true, reflection: false },
      5: { workout: true, focus: false, study: false, reflection: true },
      6: { workout: false, focus: false, study: false, reflection: false },
    };
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dailyHabits', JSON.stringify(habits));
      // Dispatch custom event to trigger dashboard update
      window.dispatchEvent(new Event('habitsUpdated'));
    }
  }, [habits]);
  const [showCustomize, setShowCustomize] = useState(false);
  const [collegeHours, setCollegeHours] = useState<{ start: string; end: string }>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('collegeHours');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored college hours', e);
        }
      }
    }
    return { start: '09:00', end: '17:00' };
  });

  // Save college hours to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('collegeHours', JSON.stringify(collegeHours));
    }
  }, [collegeHours]);

  const weekSchedule = [
    { day: 'Monday', type: 'college' as const, date: 'Mar 5', active: true },
    { day: 'Tuesday', type: 'college' as const, date: 'Mar 6', active: true },
    { day: 'Wednesday', type: 'deepwork' as const, date: 'Mar 7', active: true },
    { day: 'Thursday', type: 'college' as const, date: 'Mar 8', active: true },
    { day: 'Friday', type: 'deepwork' as const, date: 'Mar 9', active: true },
    { day: 'Saturday', type: 'deepwork' as const, date: 'Mar 10', active: true },
    { day: 'Sunday', type: 'deepwork' as const, date: 'Mar 11', active: false },
  ];

  const getTimeBreakdown = () => {
    if (routineMode === 'college') {
      return [
        { label: 'College Classes', hours: 8.5, color: 'bg-slate-600', percent: 42 },
        { label: 'Money Maker', hours: 3, color: 'bg-emerald-500', percent: 15 },
        { label: 'Soul Stuff', hours: 1, color: 'bg-rose-500', percent: 5 },
        { label: 'Commute & Food', hours: 4.5, color: 'bg-slate-600', percent: 22 },
        { label: 'Sleep', hours: 8, color: 'bg-slate-600', percent: 33 },
      ];
    } else {
      return [
        { label: 'Money Maker', hours: 8, color: 'bg-emerald-500', percent: 33 },
        { label: 'Deep Work Focus', hours: 6, color: 'bg-emerald-600', percent: 25 },
        { label: 'Soul Stuff', hours: 3, color: 'bg-rose-500', percent: 13 },
        { label: 'Curiosity Shelf', hours: 3, color: 'bg-violet-500', percent: 13 },
        { label: 'Break & Meals', hours: 2.5, color: 'bg-slate-600', percent: 10 },
        { label: 'Sleep', hours: 8, color: 'bg-slate-600', percent: 33 },
      ];
    }
  };

  const toggleHabit = (key: keyof (typeof habits)[0]) => {
    setHabits((prev) => {
      const dayIndex = selectedDay as keyof typeof prev;
      const updated = {
        ...prev,
        [dayIndex]: {
          ...prev[dayIndex],
          [key]: !prev[dayIndex][key]
        }
      };
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem('dailyHabits', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const getHabitsForDay = () => {
    const currentDay = weekSchedule[selectedDay];
    return [
      { key: 'workout' as const, task: 'Morning Workout', time: '06:00' },
      { key: 'focus' as const, task: currentDay.type === 'college' ? 'College Attendance' : 'Deep Work Session', time: currentDay.type === 'college' ? '09:00' : '08:00' },
      { key: 'study' as const, task: 'TCS/German Study', time: currentDay.type === 'college' ? '18:30' : '15:00' },
      { key: 'reflection' as const, task: 'Evening Reflection', time: '22:00' },
    ];
  };

  const timeBreakdown = getTimeBreakdown();
  const currentDay = weekSchedule[selectedDay];
  const habitsList = getHabitsForDay();
  const dayHabits = habits[selectedDay as keyof typeof habits];
  const completedHabits = Object.values(dayHabits).filter(Boolean).length;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header with Customize Button */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3">
            <Calendar className="w-6 h-6 md:w-8 md:h-8 text-violet-400" />
            Weekly Routine
          </h1>
          <p className="text-sm md:text-base text-slate-400">
            {currentDay.day} • {currentDay.date}
          </p>
        </div>
        <button
          onClick={() => setShowCustomize(!showCustomize)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-white transition-all"
        >
          {showCustomize ? (
            <>
              <X className="w-4 h-4" />
              Close
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Customize
            </>
          )}
        </button>
      </div>

      {/* Customize Modal */}
      {showCustomize && (
        <div className="glass-effect rounded-xl p-6 border border-emerald-500/30">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-emerald-400" />
            Customize College Hours
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Start Time</label>
              <input
                type="time"
                value={collegeHours.start}
                onChange={(e) => setCollegeHours((prev) => ({ ...prev, start: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">End Time</label>
              <input
                type="time"
                value={collegeHours.end}
                onChange={(e) => setCollegeHours((prev) => ({ ...prev, end: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('collegeHours', JSON.stringify(collegeHours));
              }
              setShowCustomize(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all"
          >
            <Save className="w-5 h-5" />
            Save College Schedule
          </button>
        </div>
      )}

      {/* Week Overview */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          This Week's Plan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-3">
          {weekSchedule.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`
                p-3 md:p-4 rounded-lg border-2 transition-all cursor-pointer hover:scale-105
                ${index === selectedDay
                  ? day.type === 'college'
                    ? 'border-emerald-500 bg-emerald-500/20 ring-2 ring-emerald-400'
                    : 'border-violet-500 bg-violet-500/20 ring-2 ring-violet-400'
                  : day.active 
                    ? day.type === 'college'
                      ? 'border-emerald-500/50 bg-emerald-500/10 hover:border-emerald-500'
                      : 'border-violet-500/50 bg-violet-500/10 hover:border-violet-500'
                    : 'border-slate-700 bg-slate-800/30 opacity-50 cursor-not-allowed'
                }
              `}
              disabled={!day.active && index !== selectedDay}
            >
              <p className="text-xs md:text-sm font-medium text-slate-400 mb-1">{day.day}</p>
              <div className="flex items-center gap-1.5">
                {day.type === 'college' ? (
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                ) : (
                  <Zap className="w-3 h-3 md:w-4 md:h-4 text-violet-400" />
                )}
                <p className={`text-[10px] md:text-xs font-semibold ${
                  day.type === 'college' ? 'text-emerald-400' : 'text-violet-400'
                }`}>
                  {day.type === 'college' ? 'College' : 'Deep Work'}
                </p>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">{day.date}</p>
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>Mon, Tue, Thu: College ({collegeHours.start}-{collegeHours.end})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-violet-500" />
            <span>Deep Work Days (4x/week)</span>
          </div>
        </div>
      </div>

      {/* Daily Schedule View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Timeline */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-violet-400" />
              {currentDay.day}'s Schedule
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentDay.type === 'college'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-violet-500/20 text-violet-400'
            }`}>
              {currentDay.type === 'college' ? 'College Day' : 'Deep Work Day'}
            </span>
          </div>
          <DailyStack routine={ROUTINES[currentDay.type]} />
        </div>

        {/* Habits Tracker */}
        <div className="glass-effect rounded-xl p-6">
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-rose-400" />
              Daily Habits
            </h3>
            <p className="text-xs text-slate-400">
              {completedHabits}/{Object.keys(dayHabits).length} completed
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300"
              style={{ width: `${(completedHabits / Object.keys(dayHabits).length) * 100}%` }}
            />
          </div>

          {/* Habits List */}
          <div className="space-y-3">
            {habitsList.map(({ key, task, time }) => (
              <button
                key={key}
                onClick={() => toggleHabit(key)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg transition-all
                  ${dayHabits[key]
                    ? 'bg-emerald-500/20 border border-emerald-500/50'
                    : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                  }
                `}
              >
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0
                  ${dayHabits[key]
                    ? 'bg-emerald-500 border-emerald-400'
                    : 'border-slate-600'
                  }
                `}>
                  {dayHabits[key] && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${
                    dayHabits[key] ? 'text-white line-through opacity-70' : 'text-white'
                  }`}>
                    {task}
                  </p>
                  <p className="text-xs text-slate-400">{time}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Add Habit Button */}
          <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-sm">
            <Plus className="w-4 h-4" />
            Add Custom Habit
          </button>
        </div>
      </div>

      {/* Time Breakdown */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Time Breakdown - {routineMode === 'college' ? 'College Day' : 'Deep Work Day'}
        </h2>
        <div className="space-y-4">
          {timeBreakdown.map((item, index) => (
            <div key={index}>
              <div className="flex items-end justify-between mb-1.5">
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.hours}h ({item.percent}%)</p>
                </div>
                <span className="text-xs font-bold text-slate-300">{item.percent}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`${item.color} h-full rounded-full transition-all`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">College Days</p>
            <p className="text-xl font-bold text-emerald-400">3x</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Deep Work Days</p>
            <p className="text-xl font-bold text-violet-400">4x</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Habit Streak</p>
            <p className="text-xl font-bold text-rose-400">12 days</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Consistency</p>
            <p className="text-xl font-bold text-cyan-400">87%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
