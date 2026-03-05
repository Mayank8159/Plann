'use client';

import { LayoutDashboard, Target, Calendar, Settings } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function BottomNav({ activeSection, onSectionChange }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'buckets', label: 'Buckets', icon: Target },
    { id: 'routine', label: 'Routine', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/10 backdrop-blur-xl bg-slate-900/90">
      <div className="flex items-center justify-around px-2 py-3 safe-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-lg
                transition-all duration-200 min-w-[70px]
                ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-400'
                }
              `}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
