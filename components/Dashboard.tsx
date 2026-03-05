'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import DashboardView from './views/DashboardView';
import BucketsView from './views/BucketsView';
import RoutineView from './views/RoutineView';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderView = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'buckets':
        return <BucketsView />;
      case 'routine':
        return <RoutineView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar - Desktop Only */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 sm:pb-24 md:pb-8">
        <div className="w-full max-w-full px-3 sm:px-4 md:px-8 py-4 md:py-8">
          {/* Mobile Logo */}
          <div className="md:hidden mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gradient">
              My Planner
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">3-Bucket Life Formula</p>
          </div>

          {/* Render Active View */}
          {renderView()}
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
    </div>
  );
}
