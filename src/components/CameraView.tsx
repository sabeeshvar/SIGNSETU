import React from 'react';
import { Camera, CameraOff, RefreshCw, AlertCircle, Video, CheckCircle2 } from 'lucide-react';
import type { CameraState, CameraDeviceInfo } from '../types/system';
import { HandLandmarkOverlay } from './HandLandmarkOverlay';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  cameraState: CameraState;
  errorMessage: string | null;
  handDetected: boolean;
  handCount: number;
  devices: CameraDeviceInfo[];
  selectedCameraId: string;
  onSelectCamera: (deviceId: string) => void;
  onRestartCamera: () => void;
  onToggleCamera: () => void;
  showLandmarks: boolean;
  isDemoMode: boolean;
}

export const CameraView: React.FC<CameraViewProps> = ({
  videoRef,
  canvasRef,
  cameraState,
  errorMessage,
  handDetected,
  handCount,
  devices,
  selectedCameraId,
  onSelectCamera,
  onRestartCamera,
  onToggleCamera,
  showLandmarks,
  isDemoMode,
}) => {
  return (
    <div className="glass-card overflow-hidden flex flex-col relative">
      {/* Header bar of camera card */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Camera className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 tracking-tight">
            SIGNSETU CAMERA
          </span>
          {isDemoMode && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              DEMO ACTIVE
            </span>
          )}
        </div>

        {/* Real-time Hand Detection Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors ${
              handDetected
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
            }`}
          >
            {handDetected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>HAND DETECTED ({handCount})</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse" />
                <span>NO HAND DETECTED</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Video Viewport Area */}
      <div className="relative aspect-[4/3] sm:aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Live Video Element */}
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-300 ${
            cameraState === 'RUNNING' ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 21 Landmarks Overlay Canvas */}
        <HandLandmarkOverlay canvasRef={canvasRef} showLandmarks={showLandmarks} />

        {/* Camera Overlay Guide for User Positioning */}
        {cameraState === 'RUNNING' && !handDetected && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
            <div className="w-48 h-56 sm:w-60 sm:h-64 border-2 border-dashed border-white/30 rounded-3xl flex items-center justify-center animate-pulse">
              <span className="text-white/60 text-xs px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs">
                Keep hand inside frame
              </span>
            </div>
          </div>
        )}

        {/* Loading State Overlay */}
        {cameraState === 'INITIALIZING' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/90 text-white z-20">
            <div className="w-10 h-10 border-3 border-brand-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-300">Starting camera sensor...</p>
          </div>
        )}

        {/* Stopped State Overlay */}
        {cameraState === 'STOPPED' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/95 text-white z-20 p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
              <CameraOff className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Camera is Paused</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Press start to resume real-time sign recognition.
              </p>
            </div>
            <button
              onClick={onToggleCamera}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
            >
              Start Camera
            </button>
          </div>
        )}

        {/* Error State Overlay */}
        {cameraState === 'ERROR' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/95 text-white z-20 p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="max-w-sm">
              <h4 className="font-semibold text-slate-100">Camera Access Error</h4>
              <p className="text-xs text-slate-300 mt-1">
                {errorMessage || 'Camera access is required for real-time sign recognition.'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onRestartCamera}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Camera</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Camera Controls Footer */}
      <div className="p-3 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Device Switcher */}
        {devices.length > 1 ? (
          <div className="flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedCameraId}
              onChange={e => onSelectCamera(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              {devices.map(dev => (
                <option key={dev.deviceId} value={dev.deviceId}>
                  {dev.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <span className="text-slate-500 dark:text-slate-400">
            {cameraState === 'RUNNING' ? 'Front Web Camera Active' : 'Camera Ready'}
          </span>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRestartCamera}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Restart Camera Stream"
            aria-label="Restart Camera"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleCamera}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              cameraState === 'RUNNING'
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-600'
                : 'bg-brand-600 text-white hover:bg-brand-500'
            }`}
          >
            {cameraState === 'RUNNING' ? 'Pause Camera' : 'Resume Camera'}
          </button>
        </div>
      </div>
    </div>
  );
};
