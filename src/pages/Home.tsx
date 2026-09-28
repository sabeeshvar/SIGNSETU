import React from 'react';
import { ArrowRight, HelpCircle, WifiOff, Languages, Eye, ShieldCheck, Play } from 'lucide-react';

interface HomeProps {
  onStartTranslator: () => void;
  onViewHelp: () => void;
  onExploreAbout: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onStartTranslator,
  onViewHelp,
  onExploreAbout,
}) => {
  return (
    <div className="space-y-12 py-4 sm:py-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 pb-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-2xs">
          <WifiOff className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>100% Offline Edge Computer Vision & Voice Synthesis</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            SIGN<span className="text-brand-500">SETU</span>
          </h1>
          <p className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-200">
            Breaking Communication Barriers with Offline AI
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            An offline-first Indian Sign Language communication assistant that converts supported hand gestures into Tamil and English speech in real time.
          </p>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartTranslator}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white shadow-lg shadow-brand-500/20 hover:scale-102 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START TRANSLATOR</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewHelp}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
          >
            <HelpCircle className="w-4 h-4 text-brand-500" />
            <span>VIEW HOW IT WORKS</span>
          </button>
        </div>

        {/* Visual Pipeline Flow Representation */}
        <div className="pt-8">
          <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Local Autonomous Recognition Pipeline
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs">
              ✋ Hand Gesture
            </span>
            <span className="text-brand-500">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-brand-600 dark:text-brand-400 shadow-2xs">
              ⚡ On-Device AI
            </span>
            <span className="text-brand-500">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs">
              🔤 English Text
            </span>
            <span className="text-brand-500">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-accent-50 dark:bg-accent-950/60 border border-accent-300 dark:border-accent-700 text-emerald-800 dark:text-emerald-300 font-tamil shadow-2xs">
              🏛️ தமிழ் (Tamil)
            </span>
            <span className="text-brand-500">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-2xs">
              🔊 Voice Speech
            </span>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Real-time */}
        <div className="glass-card-hover p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">REAL-TIME</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Continuous 30 FPS camera tracking extracts 21 key hand landmarks and anatomical joint positions instantaneously.
          </p>
        </div>

        {/* Offline-First */}
        <div className="glass-card-hover p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">OFFLINE-FIRST</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Operates with zero cloud API dependencies. Video frames never leave your local machine, safeguarding privacy and guaranteeing reliability.
          </p>
        </div>

        {/* Tamil + English */}
        <div className="glass-card-hover p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center">
            <Languages className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">TAMIL + ENGLISH</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Instantaneous bilingual conversion from Indian Sign Language gestures to crisp Tamil script and synthesized speech.
          </p>
        </div>

        {/* Accessible */}
        <div className="glass-card-hover p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">ACCESSIBLE</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Built for non-speaking, hard-of-hearing, and hearing communities with high contrast, touch targets, and clear audio feedback.
          </p>
        </div>
      </section>

      {/* College Hackathon Showcase Highlights */}
      <section className="glass-card p-6 sm:p-8 space-y-4 border-brand-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              NPU-Ready Edge Machine Learning Architecture
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Demonstrating full computer vision, normalization, temporal buffering, and browser Web Speech APIs.
            </p>
          </div>
          <button
            onClick={onExploreAbout}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors"
          >
            Read Architecture & Deployment Roadmap
          </button>
        </div>
      </section>

    </div>
  );
};
