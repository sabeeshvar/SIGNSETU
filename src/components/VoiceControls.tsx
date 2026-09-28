import React from 'react';
import { Volume2, VolumeX, AlertTriangle, Radio } from 'lucide-react';

interface VoiceControlsProps {
  onSpeakEnglish: () => void;
  onSpeakTamil: () => void;
  onStopVoice: () => void;
  isSpeaking: boolean;
  hasTamilVoice: boolean;
  warningMessage: string | null;
  onDismissWarning: () => void;
  disabled: boolean;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  onSpeakEnglish,
  onSpeakTamil,
  onStopVoice,
  isSpeaking,
  hasTamilVoice,
  warningMessage,
  onDismissWarning,
  disabled,
}) => {
  return (
    <div className="space-y-3">
      {/* Warning Banner if Tamil voice is unavailable on OS */}
      {warningMessage && (
        <div className="flex items-start justify-between gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Speech Voice Notice</p>
              <p className="mt-0.5 text-amber-800 dark:text-amber-300">{warningMessage}</p>
            </div>
          </div>
          <button
            onClick={onDismissWarning}
            className="text-amber-700 dark:text-amber-400 hover:text-amber-950 font-bold px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Speaking Indicator */}
      {isSpeaking && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs animate-pulse">
          <Radio className="w-3.5 h-3.5 animate-spin" />
          <span className="font-medium">Synthesizing voice output locally...</span>
        </div>
      )}

      {/* Voice Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Speak Tamil Button */}
        <button
          onClick={onSpeakTamil}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-accent-600 hover:bg-accent-500 active:scale-98 disabled:opacity-50 disabled:pointer-events-none text-white shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          <Volume2 className="w-4 h-4" />
          <span>குரல் (Tamil)</span>
          {!hasTamilVoice && (
            <span className="text-[10px] px-1 py-0.5 rounded bg-accent-700/80 font-normal">
              fallback
            </span>
          )}
        </button>

        {/* Speak English Button */}
        <button
          onClick={onSpeakEnglish}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-500 active:scale-98 disabled:opacity-50 disabled:pointer-events-none text-white shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Volume2 className="w-4 h-4" />
          <span>Voice (English)</span>
        </button>

        {/* Stop Voice Button */}
        <button
          onClick={onStopVoice}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
        >
          <VolumeX className="w-4 h-4" />
          <span>Stop Voice</span>
        </button>
      </div>
    </div>
  );
};
