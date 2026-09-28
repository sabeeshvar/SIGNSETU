import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp, Cpu, Gauge, Zap } from 'lucide-react';
import type { SystemMetrics } from '../types/system';
import { formatFPS, formatLatency } from '../utils/formatters';

interface SystemMonitorProps {
  metrics: SystemMetrics;
  handDetected: boolean;
  cameraActive: boolean;
  currentConfidence: number;
}

export const SystemMonitor: React.FC<SystemMonitorProps> = ({
  metrics,
  handDetected,
  cameraActive,
  currentConfidence,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      {/* Header clickable toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              System Telemetry & NPU Architecture
            </span>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{formatFPS(metrics.fps)}</span>
              <span>•</span>
              <span>Latency: {formatLatency(metrics.totalPipelineLatencyMs)}</span>
              <span>•</span>
              <span>Confidence: {Math.round(currentConfidence * 100)}%</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">100% Offline</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-xs hidden sm:inline">{expanded ? 'Collapse' : 'Details'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Telemetry Grid */}
      {expanded && (
        <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Camera Status */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Camera Sensor</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <span className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                <span>{cameraActive ? 'CONNECTED' : 'DISCONNECTED'}</span>
              </div>
            </div>

            {/* Hand Detection */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Hand Detection</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <span className={`w-2 h-2 rounded-full ${handDetected ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                <span>{handDetected ? 'ACTIVE' : 'SEARCHING'}</span>
              </div>
            </div>

            {/* Network Mode */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Network Mode</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>OFFLINE LOCAL</span>
              </div>
            </div>

            {/* Hardware Acceleration */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Acceleration</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-brand-600 dark:text-brand-400">
                <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="truncate">CPU / NPU READY</span>
              </div>
            </div>
          </div>

          {/* Real-time Dynamic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[10px] uppercase font-bold">Frame Rate</span>
                <Gauge className="w-3 h-3" />
              </div>
              <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                {formatFPS(metrics.fps)}
              </p>
              <span className="text-[10px] text-slate-400">measured client-side</span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[10px] uppercase font-bold">Detection Latency</span>
                <ClockIcon className="w-3 h-3" />
              </div>
              <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                {formatLatency(metrics.detectionLatencyMs)}
              </p>
              <span className="text-[10px] text-slate-400">landmark extraction</span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[10px] uppercase font-bold">Recognition Latency</span>
                <Cpu className="w-3 h-3" />
              </div>
              <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                {formatLatency(metrics.recognitionLatencyMs)}
              </p>
              <span className="text-[10px] text-slate-400">classifier inference</span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-[10px] uppercase font-bold">Total Pipeline</span>
                <Activity className="w-3 h-3" />
              </div>
              <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                {formatLatency(metrics.totalPipelineLatencyMs)}
              </p>
              <span className="text-[10px] text-slate-400">end-to-end loop</span>
            </div>
          </div>

          {/* Technical Note on Hardware Acceleration & NPU Deployment */}
          <div className="p-3 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-900/60 text-xs text-brand-900 dark:text-brand-200">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Cpu className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>NPU-Ready Edge Architecture Note</span>
            </div>
            <p className="text-[11px] leading-relaxed text-brand-800 dark:text-brand-300">
              This prototype is built on an abstracted <code className="px-1 py-0.5 bg-brand-100 dark:bg-brand-900 rounded font-mono text-[10px]">ModelAdapter</code> interface. In the current browser environment, inference runs via local Web Workers and CPU/GPU SIMD fallback. It is fully architected for seamless drop-in quantization to WebNN / ONNX Runtime Web targeting on-device Neural Processing Units (NPUs) such as Qualcomm Snapdragon X, Intel NPU, or Apple Neural Engine.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  );
}
