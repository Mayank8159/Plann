'use client';

import { LayoutDashboard, Target, Calendar } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function BottomNav({ activeSection, onSectionChange }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'buckets', label: 'Buckets', icon: Target },
    { id: 'routine', label: 'Routine', icon: Calendar },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 premium-card border-t border-white/[0.08] backdrop-blur-2xl">
      <div className="flex items-center justify-around px-1 sm:px-2 py-2 sm:py-3 safe-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                flex flex-col items-center gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl
                transition-all duration-300 min-w-fit font-medium
                ${
                  isActive
                    ? 'text-emerald-400 bg-gradient-to-b from-white/[0.08] to-white/[0.04]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }
              `}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                isActive ? 'scale-110' : 'group-hover:scale-105'
              }`} />
              <span className={`text-[9px] sm:text-[10px] ${
                isActive ? 'font-semibold' : 'font-medium'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
