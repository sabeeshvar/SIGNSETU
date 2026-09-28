import React from 'react';
import { WifiOff, Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'translator' | 'history' | 'about' | 'settings';
  setActiveTab: (tab: 'translator' | 'history' | 'about' | 'settings') => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDemoMode,
  setIsDemoMode,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo and Title */}
        <div 
          onClick={() => setActiveTab('translator')}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="SignSetu Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
            <img src="/logo.svg" alt="SignSetu Logo" className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                SIGN<span className="text-brand-500">SETU</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-accent-100 text-accent-800 dark:bg-accent-950 dark:text-accent-300 border border-accent-300 dark:border-accent-700">
                PROTOTYPE
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
              Offline ISL → Tamil / English Voice
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {(
            [
              { id: 'translator', label: 'Translator' },
              { id: 'history', label: 'History' },
              { id: 'about', label: 'About' },
              { id: 'settings', label: 'Settings' },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Quick Badges & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Offline Assurance Badge */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
            title="All camera vision and inference processes operate 100% locally on your device without cloud servers."
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">OFFLINE ACTIVE</span>
            <span className="lg:hidden">OFFLINE</span>
          </div>

          {/* Demo Mode Toggle Button */}
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              isDemoMode
                ? 'bg-amber-100 text-amber-900 border border-amber-400 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-600 shadow-xs'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title="Toggle interactive demo mode for controlled hackathon testing"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDemoMode ? 'text-amber-600 animate-spin-slow' : ''}`} />
            <span>DEMO MODE</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
