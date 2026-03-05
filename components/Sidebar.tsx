'use client';

import { LayoutDashboard, Target, Calendar, Settings } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'buckets', label: 'My Buckets', icon: Target },
    { id: 'routine', label: 'Routine', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 min-h-screen glass-effect border-r border-white/10 p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
          Plann
        </h1>
        <p className="text-xs text-slate-400 mt-1">3-Bucket Life Formula</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200 group
                ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="glass-effect rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-2">Weekly Balance</p>
          <div className="flex gap-2">
            <div className="flex-1 h-2 rounded-full bg-emerald-500/30" />
            <div className="flex-1 h-2 rounded-full bg-rose-500/30" />
            <div className="flex-1 h-2 rounded-full bg-violet-500/30" />
          </div>
        </div>
      </div>
    </aside>
  );
}
