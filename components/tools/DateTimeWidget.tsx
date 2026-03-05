'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function DateTimeWidget() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setTime(timeStr);
      setDate(dateStr);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
        <h3 className="text-base sm:text-lg font-bold text-white">Date & Time</h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div>
          <p className="text-xs text-white/60 mb-1">Current Time</p>
          <p className="text-2xl sm:text-3xl font-bold text-violet-400 font-mono">{time}</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Today</p>
          <p className="text-xs sm:text-sm text-white/80">{date}</p>
        </div>
      </div>
    </div>
  );
}
