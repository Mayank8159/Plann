'use client';

import { LayoutDashboard, Target, Calendar } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'buckets', label: 'My Buckets', icon: Target },
    { id: 'routine', label: 'Routine', icon: Calendar },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 min-h-screen premium-card border-r border-white/[0.08] p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient">
          My Planner
        </h1>
        <p className="text-xs text-white/50 mt-2">3-Bucket Life Formula</p>
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
                transition-all duration-300 group font-medium
                ${
                  isActive
                    ? 'bg-gradient-to-r from-white/[0.08] to-white/[0.04] text-white shadow-lg border border-white/[0.12]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06]'
                }
              `}
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${
                isActive 
                  ? 'text-emerald-400 scale-110' 
                  : 'group-hover:text-emerald-400'
              }`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="premium-card rounded-lg p-4">
          <p className="text-xs text-white/50 mb-3">Today's Balance</p>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-emerald-400">Money Maker</span>
                <span className="text-xs text-white/40">45%</span>
              </div>
              <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-rose-400">Soul Stuff</span>
                <span className="text-xs text-white/40">30%</span>
              </div>
              <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <div className="h-full w-[30%] bg-gradient-to-r from-rose-400 to-rose-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-violet-400">Curiosity</span>
                <span className="text-xs text-white/40">25%</span>
              </div>
              <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <div className="h-full w-[25%] bg-gradient-to-r from-violet-400 to-violet-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
