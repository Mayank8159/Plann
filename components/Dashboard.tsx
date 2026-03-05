'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import DashboardView from './views/DashboardView';
import BucketsView from './views/BucketsView';
import RoutineView from './views/RoutineView';
import SettingsView from './views/SettingsView';

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
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar - Desktop Only */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        {/* Mobile Logo */}
        <div className="md:hidden mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
            Plann
          </h1>
          <p className="text-xs text-slate-400">3-Bucket Life Formula</p>
        </div>

        {/* Render Active View */}
        {renderView()}
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
    </div>
  );
}
