import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Bell, Shield, Globe, Check } from 'lucide-react';

export const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoMatchAlerts, setAutoMatchAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">System Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">Manage application configuration, theme, and notification preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8 transition-colors duration-300">
        
        {/* Appearance Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Sun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Appearance & Theme
          </h2>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Theme Mode</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Switch between Light mode and sleek Dark mode.</p>
            </div>
            
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Notification Preferences
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Email Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receive updates when a claim status changes or matches occur.</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Automatic Item Matching Alerts</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Get notified when newly reported items match your lost items.</p>
              </div>
              <input
                type="checkbox"
                checked={autoMatchAlerts}
                onChange={(e) => setAutoMatchAlerts(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Security & System Info */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            System Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 font-semibold block">Version</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">v1.2.0 (Production)</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 font-semibold block">Status</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">● All Systems Operational</span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : null}
            {savedSuccess ? 'Settings Saved' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};
