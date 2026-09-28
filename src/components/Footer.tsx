import React from 'react';
import { ShieldCheck, WifiOff, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-6 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center p-0.5">
              <img src="/logo.svg" alt="SignSetu" className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 tracking-tight">
              SIGNSETU
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="italic">Bridging Signs to Voices.</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <WifiOff className="w-3 h-3" />
              100% Offline Capable
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-3 h-3 text-brand-500" />
              Privacy-First (No Cloud Streaming)
            </span>
          </div>
        </div>

        {/* Privacy & Educational Notice */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          <p>
            <strong>Privacy Policy & Architecture:</strong> Camera frames are processed entirely locally in your browser memory for real-time sign recognition. SignSetu does not record, store, or transmit video or biometric images to remote servers or third-party APIs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} SignSetu Assistive Project — Built for College Hackathon Demonstration.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
            <span>for accessible communication</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
