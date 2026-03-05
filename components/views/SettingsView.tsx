'use client';

import { useState } from 'react';
import { Settings, User, Bell, Palette, Moon, Sun, Globe, Clock, Save } from 'lucide-react';

export default function SettingsView() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3">
          <Settings className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
          Settings
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          Customize your experience and manage preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Profile</h2>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 via-rose-400 to-violet-400 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">MK</span>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Full Name</label>
                <input
                  type="text"
                  defaultValue="Mayank Kumar Sharma"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Email</label>
                <input
                  type="email"
                  defaultValue="mayank@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-rose-400" />
          <h2 className="text-xl font-bold text-white">Appearance</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-violet-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
              <div>
                <p className="text-sm font-medium text-white">Dark Mode</p>
                <p className="text-xs text-slate-400">Use dark theme across the app</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                darkMode ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-7' : ''
              }`} />
            </button>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50">
            <p className="text-sm font-medium text-white mb-3">Accent Color</p>
            <div className="flex gap-3">
              {[
                { color: 'emerald', class: 'bg-emerald-500' },
                { color: 'rose', class: 'bg-rose-500' },
                { color: 'violet', class: 'bg-violet-500' },
                { color: 'blue', class: 'bg-blue-500' },
                { color: 'amber', class: 'bg-amber-500' },
              ].map((accent) => (
                <button
                  key={accent.color}
                  className={`w-10 h-10 rounded-lg ${accent.class} hover:scale-110 transition-transform ${
                    accent.color === 'emerald' ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-violet-400" />
          <h2 className="text-xl font-bold text-white">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
            <div>
              <p className="text-sm font-medium text-white">Push Notifications</p>
              <p className="text-xs text-slate-400">Receive reminders and updates</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                notifications ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-7' : ''
              }`} />
            </button>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50">
            <p className="text-sm font-medium text-white mb-3">Notification Times</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Morning</label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Evening</label>
                <input
                  type="time"
                  defaultValue="20:00"
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Settings */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Schedule</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
            <div>
              <p className="text-sm font-medium text-white">Auto-Schedule Optimization</p>
              <p className="text-xs text-slate-400">Let AI optimize your daily routine</p>
            </div>
            <button
              onClick={() => setAutoSchedule(!autoSchedule)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                autoSchedule ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                autoSchedule ? 'translate-x-7' : ''
              }`} />
            </button>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50">
            <p className="text-sm font-medium text-white mb-3">Weekly Distribution</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">College Days</label>
                <input
                  type="number"
                  defaultValue="3"
                  min="0"
                  max="7"
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Deep Work Days</label>
                <input
                  type="number"
                  defaultValue="4"
                  min="0"
                  max="7"
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Regional</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Language</label>
            <select className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none">
              <option>English (US)</option>
              <option>Hindi</option>
              <option>Deutsch</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Time Zone</label>
            <select className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none">
              <option>Asia/Kolkata (IST)</option>
              <option>Europe/Berlin (CET)</option>
              <option>America/New_York (EST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50">
        <Save className="w-5 h-5" />
        Save Changes
      </button>
    </div>
  );
}
