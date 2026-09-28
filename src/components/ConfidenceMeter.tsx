import React from 'react';
import type { ConfidenceLevel } from '../types/recognition';
import { getConfidenceAdvice } from '../ml/confidence';
import { ShieldCheck, ShieldAlert, HelpCircle } from 'lucide-react';

interface ConfidenceMeterProps {
  confidence: number; // 0..1 or 0..100
  level: ConfidenceLevel;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ confidence, level }) => {
  const percentage = Math.round(confidence <= 1 ? confidence * 100 : confidence);
  const advice = getConfidenceAdvice(level);

  let badgeColor = 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  let barColor = 'bg-slate-400';
  let labelText = 'UNKNOWN';
  let Icon = HelpCircle;

  if (level === 'high') {
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700';
    barColor = 'bg-emerald-500';
    labelText = 'HIGH CONFIDENCE';
    Icon = ShieldCheck;
  } else if (level === 'confirming') {
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700';
    barColor = 'bg-amber-500';
    labelText = 'CONFIRMING';
    Icon = ShieldAlert;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
          <Icon className="w-3.5 h-3.5" />
          <span>Confidence Level</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeColor}`}>
            {labelText}
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Smooth Progress Meter */}
      <div 
        className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Gesture recognition confidence"
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>

      {/* Dynamic guidance advice */}
      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
        {advice}
      </p>
    </div>
  );
};
