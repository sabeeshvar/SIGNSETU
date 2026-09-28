import React from 'react';
import { Sparkles, Trash2, Eye, Info } from 'lucide-react';
import type { RecognitionResult as RecognitionResultType } from '../types/recognition';
import { ConfidenceMeter } from './ConfidenceMeter';
import { TranslationPanel } from './TranslationPanel';
import { VoiceControls } from './VoiceControls';

interface RecognitionResultProps {
  result: RecognitionResultType | null;
  onClear: () => void;
  onSpeakEnglish: () => void;
  onSpeakTamil: () => void;
  onStopVoice: () => void;
  isSpeaking: boolean;
  hasTamilVoice: boolean;
  warningMessage: string | null;
  onDismissWarning: () => void;
}

export const RecognitionResult: React.FC<RecognitionResultProps> = ({
  result,
  onClear,
  onSpeakEnglish,
  onSpeakTamil,
  onStopVoice,
  isSpeaking,
  hasTamilVoice,
  warningMessage,
  onDismissWarning,
}) => {
  const hasResult = result !== null && result.gestureId !== 'unknown';

  return (
    <div className="glass-card p-5 space-y-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 tracking-tight">
            RECOGNITION & SYNTHESIS
          </h3>
        </div>

        {hasResult && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
            title="Clear Current Sign"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Main Detected Sign Card */}
      <div className="space-y-4">
        {hasResult ? (
          <div className="space-y-4 animate-fade-in">
            {/* Big Detected Label Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-50/80 via-white to-accent-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-850 border border-brand-200/80 dark:border-brand-900/80 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                  Detected Gesture
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  Live Classifier
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {result.english}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-accent-700 dark:text-accent-400 font-tamil">
                  {result.tamil}
                </span>
              </div>

              {/* Explanatory morphology notes */}
              {result.explanation && (
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 pt-2">
                  <Info className="w-3 h-3 text-brand-500 shrink-0" />
                  <span className="truncate">Cues: {result.explanation}</span>
                </div>
              )}
            </div>

            {/* Confidence Meter Component */}
            <ConfidenceMeter confidence={result.confidence} level={result.level} />

            {/* Translation Details Component */}
            <TranslationPanel englishText={result.english} />
          </div>
        ) : (
          <div className="py-12 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                Awaiting Indian Sign Language Gesture
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                Hold a supported sign (e.g. HELLO, THANK YOU, HELP, YES) inside the camera frame.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Voice Controls */}
      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
        <VoiceControls
          onSpeakEnglish={onSpeakEnglish}
          onSpeakTamil={onSpeakTamil}
          onStopVoice={onStopVoice}
          isSpeaking={isSpeaking}
          hasTamilVoice={hasTamilVoice}
          warningMessage={warningMessage}
          onDismissWarning={onDismissWarning}
          disabled={!hasResult}
        />
      </div>
    </div>
  );
};
