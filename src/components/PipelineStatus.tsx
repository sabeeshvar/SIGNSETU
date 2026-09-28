import React from 'react';
import { Camera, Hand, Network, Cpu, Languages, Volume2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { PipelineStatusMap, PipelineStage, StageState } from '../types/recognition';

interface PipelineStatusProps {
  statusMap: PipelineStatusMap;
}

const STAGES: { id: PipelineStage; name: string; icon: React.ElementType }[] = [
  { id: 'camera', name: 'Camera', icon: Camera },
  { id: 'detection', name: 'Hand Detection', icon: Hand },
  { id: 'landmarks', name: '21 Landmarks', icon: Network },
  { id: 'recognition', name: 'Gesture ML', icon: Cpu },
  { id: 'translation', name: 'Tamil Engine', icon: Languages },
  { id: 'voice', name: 'Speech TTS', icon: Volume2 },
];

export const PipelineStatus: React.FC<PipelineStatusProps> = ({ statusMap }) => {
  const getBadge = (state: StageState) => {
    switch (state) {
      case 'complete':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
          icon: CheckCircle2,
          pulse: false,
        };
      case 'processing':
        return {
          bg: 'bg-brand-500/10 border-brand-500/30 text-brand-700 dark:text-brand-400',
          icon: Clock,
          pulse: true,
        };
      case 'error':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400',
          icon: AlertCircle,
          pulse: false,
        };
      case 'inactive':
      default:
        return {
          bg: 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500',
          icon: Clock,
          pulse: false,
        };
    }
  };

  return (
    <div className="glass-card p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Live System Processing Pipeline
        </h4>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
          100% Client-Side
        </span>
      </div>

      {/* Horizontal Interactive Pipeline Visualizer */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
        {STAGES.map((stage, idx) => {
          const status = statusMap[stage.id] || { state: 'inactive', label: stage.name };
          const badge = getBadge(status.state);
          const Icon = stage.icon;
          const StatusIcon = badge.icon;

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${badge.bg} ${
                badge.pulse ? 'ring-1 ring-brand-500/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/70 shadow-2xs">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold opacity-60">0{idx + 1}</span>
              </div>

              <div className="mt-2.5">
                <p className="text-xs font-bold leading-tight truncate">{stage.name}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] truncate">
                  <StatusIcon className={`w-3 h-3 shrink-0 ${badge.pulse ? 'animate-spin' : ''}`} />
                  <span className="truncate">{status.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
