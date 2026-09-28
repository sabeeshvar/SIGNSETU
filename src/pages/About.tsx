import React from 'react';
import { Cpu, ShieldCheck, WifiOff, Volume2, Eye, GitBranch } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-sm">
      
      {/* Title & Vision */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <span>Bridge Between Signs & Speech</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          About SignSetu (சைன்சேது)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          An offline-first, privacy-centric assistive communication system bridging Indian Sign Language (ISL) gestures to native Tamil script and spoken voice.
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            01
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">The Challenge</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Communication barriers can make everyday interactions difficult for Deaf and hard-of-hearing individuals, particularly in public spaces, hospitals, transit, and classrooms where certified sign language interpreters or reliable high-speed internet connections are unavailable.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center font-bold">
            02
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">The SignSetu Solution</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            SignSetu provides a local camera-based assistive interface for recognizing a configurable set of Indian Sign Language gestures and translating them into clear Tamil and English text and synthesized speech—entirely on the client device without sending video frames to external servers.
          </p>
        </div>
      </div>

      {/* Core Engineering Stack */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Technical Stack & Edge Architecture
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-brand-500" />
              Computer Vision
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              MediaPipe Vision Tasks & local edge contour segmentation.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-accent-500" />
              Feature Engineering
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Translation & scale invariant landmark normalization.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-sky-500" />
              Temporal Buffer
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Sliding window smoothing to eliminate flickering.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5 text-emerald-500" />
              Offline Translation
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              In-memory Tamil lexicon with transliteration.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-purple-500" />
              Speech Engine
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              On-device Web Speech API with native Tamil voice discovery.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              Privacy Assurance
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Zero cloud upload, zero telemetry trackers.
            </p>
          </div>
        </div>
      </div>

      {/* NPU Deployment Roadmap */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            NPU Edge Acceleration Roadmap
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          The recognizer uses a decoupled <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[11px]">ModelAdapter</code> interface. The progression toward edge silicon acceleration follows:
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            1. TRAIN MODEL
          </span>
          <span>→</span>
          <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            2. EXPORT ONNX/TFLITE
          </span>
          <span>→</span>
          <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            3. INT8 QUANTIZATION
          </span>
          <span>→</span>
          <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            4. EDGE RUNTIME (WebNN)
          </span>
          <span>→</span>
          <span className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950 border border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300">
            5. NPU ACCELERATION
          </span>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Privacy & Security Notice</span>
        </div>
        <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
          Camera frames are processed entirely locally in memory. SignSetu does not send video feeds, biometrics, or captured landmarks to any remote server or cloud AI provider.
        </p>
      </div>

    </div>
  );
};
