import React from 'react';
import { Camera, Hand, ShieldCheck, Volume2, ArrowRight } from 'lucide-react';
import { StorageService } from '../services/StorageService';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleStart = () => {
    StorageService.setOnboardingCompleted(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border-brand-500/20">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center p-1 shadow-md">
            <img src="/logo.svg" alt="SignSetu" className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome to SIGNSETU
            </h2>
            <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
              Offline Indian Sign Language → Tamil & English Voice
            </p>
          </div>
        </div>

        {/* 5 Quick Steps */}
        <div className="space-y-3 text-xs">
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            Follow these 5 simple steps for optimal recognition:
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="p-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">1. Allow Camera Access</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Grant webcam permission so the on-device AI can extract hand landmarks locally.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="p-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold shrink-0">
                <Hand className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">2. Place Hand in Frame</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Keep your hand clearly visible inside the camera guide in adequate lighting.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="p-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold shrink-0">
                <span className="w-4 h-4 flex items-center justify-center text-xs">⏳</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">3. Hold Gesture Steady</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Maintain the sign for half a second to allow temporal smoothing to lock the prediction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">4. Wait for Confidence</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Green meter (&ge;85%) indicates high-confidence recognition ready for speech synthesis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="p-1 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 font-bold shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">5. Press Speak (Voice Output)</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Listen to instant Tamil (வணக்கம்) or English voice synthesized via browser speech engine.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white shadow-md transition-all hover:scale-[1.01]"
        >
          <span>START TRANSLATOR</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
