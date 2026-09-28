import React from 'react';
import { Sparkles, XCircle, Check } from 'lucide-react';
import { SUPPORTED_GESTURES } from '../data/gestures';

interface DemoSelectorProps {
  activeDemoId: string | null;
  onSelectGesture: (gestureId: string) => void;
  onClearDemo: () => void;
}

export const DemoSelector: React.FC<DemoSelectorProps> = ({
  activeDemoId,
  onSelectGesture,
  onClearDemo,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-200">
                HACKATHON DEMO RECOGNITION MODE
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400">
              Select any gesture below to stream realistic 21-landmark coordinates through the full recognition, Tamil translation, and speech pipeline.
            </p>
          </div>
        </div>

        {activeDemoId && (
          <button
            onClick={onClearDemo}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950 transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Clear Demo</span>
          </button>
        )}
      </div>

      {/* Grid of 14 Supported Gestures */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-1">
        {SUPPORTED_GESTURES.map(gesture => {
          const isSelected = activeDemoId === gesture.id;
          return (
            <button
              key={gesture.id}
              onClick={() => onSelectGesture(gesture.id)}
              className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-sm scale-102'
                  : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border-amber-200/80 dark:border-amber-900/60 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold uppercase truncate text-[11px]">{gesture.english}</span>
                {isSelected && <Check className="w-3 h-3 text-white shrink-0 ml-1" />}
              </div>
              <span className={`text-[10px] mt-1 font-tamil truncate ${isSelected ? 'text-amber-100' : 'text-emerald-700 dark:text-emerald-400'}`}>
                {gesture.tamil}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
