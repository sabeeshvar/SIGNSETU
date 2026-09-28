import React from 'react';
import { Languages, BookOpen } from 'lucide-react';
import { TranslationService } from '../services/TranslationService';

interface TranslationPanelProps {
  englishText: string;
}

export const TranslationPanel: React.FC<TranslationPanelProps> = ({ englishText }) => {
  const entry = TranslationService.getTranslationEntry(englishText);
  const tamilText = entry ? entry.tamil : (englishText ? 'மொழிபெயர்ப்பு தயார்' : 'சைகைக்காகக் காத்திருக்கிறது');
  const transliteration = entry?.transliteration || '';

  return (
    <div className="glass-card p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <div className="p-1.5 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
            <Languages className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm tracking-tight">OFFLINE TRANSLATION</span>
        </div>
        <span className="text-[11px] font-semibold text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-950 px-2.5 py-0.5 rounded-full border border-accent-200 dark:border-accent-800">
          English ⇄ Tamil
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* English Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            Recognized Sign (English)
          </span>
          <div className="mt-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {englishText || '—'}
            </span>
          </div>
          {entry && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              "{entry.contextSentenceEn}"
            </p>
          )}
        </div>

        {/* Tamil Box */}
        <div className="p-3.5 rounded-xl bg-accent-50/50 dark:bg-accent-950/30 border border-accent-200/80 dark:border-accent-800/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-accent-700 dark:text-accent-300">
              தமிழ் வடிவம் (Tamil)
            </span>
            {transliteration && (
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 italic">
                {transliteration}
              </span>
            )}
          </div>
          <div className="mt-1.5">
            <span className="text-xl sm:text-2xl font-black text-emerald-800 dark:text-emerald-300 tracking-tight font-tamil">
              {tamilText}
            </span>
          </div>
          {entry && (
            <p className="mt-2 text-xs text-emerald-700/80 dark:text-emerald-400/80 font-tamil">
              "{entry.contextSentenceTa}"
            </p>
          )}
        </div>
      </div>

      {entry && (
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Category: <strong className="capitalize text-slate-700 dark:text-slate-300">{entry.category}</strong></span>
        </div>
      )}
    </div>
  );
};
