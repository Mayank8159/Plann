'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = new Date();
  const days = [];
  const firstDay = firstDayOfMonth(currentDate);
  const daysCount = daysInMonth(currentDate);

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysCount; i++) {
    days.push(i);
  }

  return (
    <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">Calendar</h3>
        </div>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-white/[0.08] rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-white/[0.08] rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-white/80 mb-3 sm:mb-4 text-center">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </p>

      <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center">
            <p className="text-[10px] sm:text-xs text-white/60 font-semibold">{day.slice(0, 2)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isToday =
            day &&
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <div
              key={idx}
              className={`
                aspect-square flex items-center justify-center text-xs sm:text-sm rounded
                ${day === null ? '' : 'bg-white/[0.04] hover:bg-white/[0.08] transition-colors'}
                ${isToday ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white font-bold shadow-lg' : 'text-white/60'}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
