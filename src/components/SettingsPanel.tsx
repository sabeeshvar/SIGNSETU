import React from 'react';
import { Settings, Sliders, Volume2, Video, Sparkles, Shield, Eye } from 'lucide-react';
import type { AppSettings, CameraDeviceInfo } from '../types/system';

interface SettingsPanelProps {
  settings: AppSettings;
  devices: CameraDeviceInfo[];
  onUpdateSettings: (settings: AppSettings) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  devices,
  onUpdateSettings,
}) => {
  const handleChange = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <div className="glass-card p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">SignSetu System Settings</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure recognition thresholds, audio options, camera selection, and interface modes.
          </p>
        </div>
      </div>

      <div className="space-y-5 text-sm">
        {/* Camera Selector */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 text-xs">
            <Video className="w-3.5 h-3.5 text-brand-500" />
            <span>Active Camera Device</span>
          </label>
          <select
            value={settings.selectedCameraId}
            onChange={e => handleChange('selectedCameraId', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Default Front Camera</option>
            {devices.map(dev => (
              <option key={dev.deviceId} value={dev.deviceId}>
                {dev.label}
              </option>
            ))}
          </select>
        </div>

        {/* Demo Mode Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 font-semibold text-xs text-amber-900 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Interactive Demo Mode</span>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400">
              Enables controlled demo selection panel to guarantee flawless presentations during hackathons.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.isDemoMode}
            onChange={e => handleChange('isDemoMode', e.target.checked)}
            className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
          />
        </div>

        {/* Auto Voice Output */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 font-semibold text-xs text-slate-800 dark:text-slate-200">
              <Volume2 className="w-3.5 h-3.5 text-accent-500" />
              <span>Auto-Voice On High Confidence</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Automatically trigger speech output when a gesture is held steady with &gt;85% confidence.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoVoiceEnabled}
            onChange={e => handleChange('autoVoiceEnabled', e.target.checked)}
            className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
          />
        </div>

        {/* Show Hand Landmarks Overlay */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 font-semibold text-xs text-slate-800 dark:text-slate-200">
              <Eye className="w-3.5 h-3.5 text-brand-500" />
              <span>Render 21 Hand Landmarks</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Draw green/blue joints and anatomical bone lines over the live camera view.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.showLandmarks}
            onChange={e => handleChange('showLandmarks', e.target.checked)}
            className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
          />
        </div>

        {/* Confidence Threshold Slider */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-xs text-slate-800 dark:text-slate-200">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Recognition Confidence Filter</span>
            </div>
            <span className="font-bold text-xs text-brand-600 dark:text-brand-400">
              {settings.confidenceThreshold}%
            </span>
          </div>
          <input
            type="range"
            min={40}
            max={85}
            step={5}
            value={settings.confidenceThreshold}
            onChange={e => handleChange('confidenceThreshold', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Relaxed (40%)</span>
            <span>Recommended (60%)</span>
            <span>Strict (85%)</span>
          </div>
        </div>

        {/* Temporal Smoothing Buffer Window Slider */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-xs text-slate-800 dark:text-slate-200">
              <Sliders className="w-3.5 h-3.5 text-brand-500" />
              <span>Temporal Smoothing Buffer Frames</span>
            </div>
            <span className="font-bold text-xs text-brand-600 dark:text-brand-400">
              {settings.smoothingWindow} Frames
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={15}
            step={1}
            value={settings.smoothingWindow}
            onChange={e => handleChange('smoothingWindow', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Higher values eliminate gesture flickering; lower values yield faster instantaneous response.
          </p>
        </div>

      </div>
    </div>
  );
};
