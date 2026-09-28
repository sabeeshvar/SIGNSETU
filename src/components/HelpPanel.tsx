import React from 'react';
import { HelpCircle, Hand, Sparkles, Volume2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { SUPPORTED_GESTURES } from '../data/gestures';

export const HelpPanel: React.FC = () => {
  return (
    <div className="glass-card p-6 space-y-6 max-w-4xl mx-auto text-sm">
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">SignSetu User & Presentation Guide</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Instructions on hand positioning, confidence scoring, voice output, and prototype vocabulary.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hand Positioning */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
            <Hand className="w-4 h-4 text-brand-500" />
            <span>1. Hand Positioning</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Position your hand approximately <strong>1.5 to 2.5 feet (0.5m – 0.8m)</strong> away from the web camera in decent ambient lighting. Keep your hand clearly visible inside the dashed camera frame guide.
          </p>
        </div>

        {/* Confidence Tiering */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>2. Confidence Scoring</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Gestures are verified through temporal smoothing. <strong>&ge;85%</strong> indicates High Confidence (voice ready). <strong>60%–84%</strong> indicates Confirming (hold steady). Below 60% is filtered as Unknown to prevent misclassifications.
          </p>
        </div>

        {/* Voice Synthesis */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
            <Volume2 className="w-4 h-4 text-accent-500" />
            <span>3. Voice Output & Tamil TTS</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            SignSetu utilizes the browser's on-device <code>speechSynthesis</code> API. If your operating system has a Tamil voice installed (e.g., Windows Tamil Language Pack, Android TTS, or macOS Tamil), it speaks native Tamil. Otherwise, it gracefully alerts and uses English voice fallback without crashing.
          </p>
        </div>

        {/* Demo Mode */}
        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>4. Hackathon Demo Mode</span>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Need to present in difficult podium lighting or without a webcam? Click <strong>DEMO MODE</strong> in the header or below the camera to select gestures and demonstrate the entire end-to-end landmark, translation, and speech pipeline.
          </p>
        </div>
      </div>

      {/* Supported Gestures Reference Grid */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Supported Prototype Vocabulary ({SUPPORTED_GESTURES.length} Gestures)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Note: This represents a focused prototype vocabulary for college demonstration and does not claim full grammatical coverage of all Indian Sign Language.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {SUPPORTED_GESTURES.map(gesture => (
            <div
              key={gesture.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {gesture.english}
                </span>
                <span className="font-bold text-xs text-accent-700 dark:text-accent-400 font-tamil">
                  {gesture.tamil}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {gesture.hint}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p>
          <strong>Scientific Notice:</strong> Indian Sign Language (ISL) is a rich, natural language featuring complex spatial grammar, facial expressions, and two-handed continuous signs. SignSetu is currently an assistive prototype demonstrating edge computer vision, local feature extraction, and bilingual speech synthesis.
        </p>
      </div>
    </div>
  );
};
