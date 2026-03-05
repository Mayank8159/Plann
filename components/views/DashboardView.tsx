'use client';

import { PROGRESS_ITEMS, ROUTINES } from '@/lib/constants';
import ProgressCard from '../ProgressCard';
import DailyStack from '../DailyStack';
import RoutineToggle from '../RoutineToggle';
import { Sparkles, TrendingUp, Calendar, Target, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardView() {
  const [routineMode, setRoutineMode] = useState<'college' | 'deepwork'>('college');
  const [stats, setStats] = useState({
    weekProgress: 0,
    streak: 1,
    todayTasks: 0,
    focusScore: 0,
    habits: [] as Array<{ day: number; completed: number; total: number }>,
  });

  // Function to calculate all stats
  const calculateStats = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dailyHabits');
      if (stored) {
        try {
          const habits = JSON.parse(stored);
          
          // Get today's day index (0=Monday, 6=Sunday)
          const today = new Date().getDay();
          const todayIndex = today === 0 ? 6 : today - 1;
          
          // Calculate today's completed habits
          const todayHabits = habits[todayIndex] || {};
          const completedToday = Object.values(todayHabits).filter(Boolean).length;
          const totalHabits = Object.keys(todayHabits).length || 4;

          // Calculate streak: consecutive days with all habits completed
          let streak = 0;
          const maxStreak = 30; // Support up to 30-day streaks
          
          for (let i = 0; i < maxStreak; i++) {
            const checkDayIndex = (todayIndex - i + 7) % 7;
            const dayHabits = habits[checkDayIndex] || {};
            const dayCompleted = Object.values(dayHabits).filter(Boolean).length;
            const dayTotal = Object.keys(dayHabits).length || 4;
            
            // If this day has all habits completed, increment streak
            if (dayCompleted === dayTotal && dayTotal > 0) {
              streak++;
            } else {
              break; // Break if any day is incomplete
            }
          }

          // Calculate week progress (average completion across all days)
          let weekTotal = 0;
          let weekCount = 0;
          for (let i = 0; i < 7; i++) {
            const dayHabits = habits[i] || {};
            const completed = Object.values(dayHabits).filter(Boolean).length || 0;
            const total = Object.keys(dayHabits).length || 4;
            weekTotal += completed;
            weekCount += total;
          }
          const weekProgress = weekCount > 0 ? Math.round((weekTotal / weekCount) * 100) : 0;

          // Calculate focus score (0-10) from progress items
          const avgProgress = PROGRESS_ITEMS.reduce((sum, item) => sum + (item.current / item.total), 0) / PROGRESS_ITEMS.length;
          const focusScore = (avgProgress * 10).toFixed(1);

          // Calculate today's tasks progress (out of 10)
          const taskProgress = Math.round((completedToday / totalHabits) * 10);

          setStats({
            weekProgress,
            streak: Math.max(streak, 1), // At least 1 day
            todayTasks: taskProgress,
            focusScore: parseFloat(focusScore),
            habits: [],
          });
        } catch (e) {
          console.error('Failed to parse habits for stats', e);
        }
      }
    }
  };

  // Calculate stats initially and whenever localStorage changes
  useEffect(() => {
    calculateStats();

    // Listen for storage changes from other tabs/components
    const handleStorageChange = () => {
      calculateStats();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for a custom event when habits are updated in the same tab
    window.addEventListener('habitsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('habitsUpdated', handleStorageChange);
    };
  }, []);

  // Calculate bucket balance based on routine schedule percentages
  const getBucketBalance = () => {
    if (routineMode === 'college') {
      return [
        { name: 'Money Maker', percent: 45 },
        { name: 'Soul Stuff', percent: 30 },
        { name: 'Curiosity Shelf', percent: 25 },
      ];
    } else {
      return [
        { name: 'Money Maker', percent: 50 },
        { name: 'Soul Stuff', percent: 25 },
        { name: 'Curiosity Shelf', percent: 25 },
      ];
    }
  };

  const bucketBalance = getBucketBalance();
  
  const colorMap = {
    'Money Maker': { textColor: 'text-emerald-400', bgColor: 'bg-emerald-500' },
    'Soul Stuff': { textColor: 'text-rose-400', bgColor: 'bg-rose-500' },
    'Curiosity Shelf': { textColor: 'text-violet-400', bgColor: 'bg-violet-500' },
  };

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
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.weekProgress}%</p>
          <p className="text-xs text-slate-500 mt-1">All activities</p>
        </div>
        <div className="glass-effect rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-rose-400" />
            <p className="text-xs md:text-sm text-slate-400">Streak</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.streak}</p>
          <p className="text-xs text-slate-500 mt-1">days consistent</p>
        </div>
        <div className="glass-effect rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-violet-400" />
            <p className="text-xs md:text-sm text-slate-400">Today's Progress</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.todayTasks}/10</p>
          <p className="text-xs text-slate-500 mt-1">tasks completed</p>
        </div>
        <div className="glass-effect rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <p className="text-xs md:text-sm text-slate-400">Focus Score</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.focusScore}</p>
          <p className="text-xs text-slate-500 mt-1">out of 10</p>
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
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Weekly Balance ({routineMode === 'college' ? 'College Day' : 'Deep Work Day'})</h2>
            <div className="glass-effect rounded-xl p-6">
              <div className="space-y-4">
                {bucketBalance.map((bucket, idx) => {
                  const colors = colorMap[bucket.name as keyof typeof colorMap];
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${colors.textColor}`}>
                          {bucket.name}
                        </span>
                        <span className="text-sm text-slate-400">{bucket.percent}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${colors.bgColor}`}
                          style={{ width: `${bucket.percent}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
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
