'use client';

import { useState } from 'react';
import { BUCKETS, PROGRESS_ITEMS, ROUTINES } from '@/lib/constants';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import BucketCard from './BucketCard';
import ProgressCard from './ProgressCard';
import DailyStack from './DailyStack';
import RoutineToggle from './RoutineToggle';
import { Sparkles, Menu } from 'lucide-react';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [routineMode, setRoutineMode] = useState<'college' | 'deepwork'>('college');

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar - Desktop Only */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          {/* Mobile Logo */}
          <div className="md:hidden mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
              Plann
            </h1>
            <p className="text-xs text-slate-400">3-Bucket Life Formula</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
                <span className="hidden md:inline">3-Bucket Life Formula</span>
                <span className="md:hidden">Dashboard</span>
              </h1>
              <p className="text-sm md:text-base text-slate-400">
                Balance your career growth, well-being, and curiosity
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs md:text-sm text-slate-400">Today's Focus</p>
              <p className="text-lg md:text-xl font-semibold text-white">
                {routineMode === 'college' ? 'College Day' : 'Deep Work Day'}
              </p>
            </div>
          </div>
        </div>

        {/* Routine Toggle */}
        <div className="mb-6 md:mb-8 flex justify-center overflow-x-auto">
          <RoutineToggle selectedMode={routineMode} onModeChange={setRoutineMode} />
        </div>

        {/* Progress Cards */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Progress Tracking</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PROGRESS_ITEMS.map((item) => (
              <ProgressCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Main Grid: Buckets & Daily Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Buckets Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Your Three Buckets</h2>
            {BUCKETS.map((bucket) => (
              <BucketCard key={bucket.id} bucket={bucket} />
            ))}
          </div>

          {/* Daily Stack Column */}
          <div className="lg:col-span-1">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Daily Stack</h2>
            <DailyStack routine={ROUTINES[routineMode]} />
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="glass-effect rounded-xl p-4 md:p-6 text-center">
            <p className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">40%</p>
            <p className="text-xs md:text-sm text-slate-400">Money Maker Focus</p>
          </div>
          <div className="glass-effect rounded-xl p-4 md:p-6 text-center">
            <p className="text-2xl md:text-3xl font-bold text-rose-400 mb-2">35%</p>
            <p className="text-xs md:text-sm text-slate-400">Soul Stuff Focus</p>
          </div>
          <div className="glass-effect rounded-xl p-4 md:p-6 text-center">
            <p className="text-2xl md:text-3xl font-bold text-violet-400 mb-2">25%</p>
            <p className="text-xs md:text-sm text-slate-400">Curiosity Shelf Focus</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
    </div>
  );
}
