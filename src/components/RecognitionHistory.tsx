import React from 'react';
import { History, Trash2, Clock, Volume2 } from 'lucide-react';
import type { RecognitionHistoryItem } from '../types/recognition';
import { StorageService } from '../services/StorageService';
import { SpeechService } from '../services/SpeechService';

interface RecognitionHistoryProps {
  history: RecognitionHistoryItem[];
  onHistoryUpdated: (items: RecognitionHistoryItem[]) => void;
}

export const RecognitionHistory: React.FC<RecognitionHistoryProps> = ({
  history,
  onHistoryUpdated,
}) => {
  const handleClear = () => {
    StorageService.clearHistory();
    onHistoryUpdated([]);
  };

  const handleSpeakItem = (item: RecognitionHistoryItem) => {
    SpeechService.speakTamil(item.tamil, item.english);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 tracking-tight">
              RECOGNITION LOG
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Stores up to 20 recent signs locally on this device
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No gestures recognized yet in this session.</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Signs recognized with high confidence will automatically be logged here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Sign (English)</th>
                <th className="py-2 px-3">Tamil Translation</th>
                <th className="py-2 px-3 text-right">Confidence</th>
                <th className="py-2 px-3 text-right">Voice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {history.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {item.timeString}
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-slate-100 font-bold">
                    {item.english}
                  </td>
                  <td className="py-2.5 px-3 text-accent-700 dark:text-accent-400 font-bold font-tamil text-sm">
                    {item.tamil}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {item.confidence}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleSpeakItem(item)}
                      className="p-1 rounded-md text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      title="Speak Tamil voice"
                      aria-label={`Speak ${item.english}`}
                    >
                      <Volume2 className="w-3.5 h-3.5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
