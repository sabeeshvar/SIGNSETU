import React, { useState } from 'react';
import { CameraView } from '../components/CameraView';
import { RecognitionResult } from '../components/RecognitionResult';
import { PipelineStatus } from '../components/PipelineStatus';
import { SystemMonitor } from '../components/SystemMonitor';
import { DemoSelector } from '../components/DemoSelector';
import { useCamera } from '../hooks/useCamera';
import { useGestureRecognition } from '../hooks/useGestureRecognition';
import { useSpeech } from '../hooks/useSpeech';
import type { AppSettings } from '../types/system';
import type { RecognitionResult as RecognitionResultType } from '../types/recognition';

interface TranslatorProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export const Translator: React.FC<TranslatorProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [activeDemoGestureId, setActiveDemoGestureId] = useState<string | null>(null);

  // Camera Management Hook
  const {
    videoRef,
    cameraState,
    errorMessage,
    devices,
    startCamera,
    stopCamera,
    restartCamera,
  } = useCamera(settings.selectedCameraId);

  // Canvas ref for overlay rendering
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Speech Hook
  const {
    speakEnglish,
    speakTamil,
    stopVoice,
    hasTamilVoice,
    speechWarning,
    isSpeaking,
    clearWarning,
  } = useSpeech();

  // Gesture Recognition & Computer Vision Loop Hook
  const {
    currentResult,
    handDetected,
    handCount,
    metrics,
    pipelineStatus,
    triggerDemoGesture,
    clearDemoGesture,
    clearResult,
  } = useGestureRecognition(
    videoRef,
    canvasRef,
    settings,
    (autoResult: RecognitionResultType) => {
      // Auto-voice trigger callback
      speakTamil(autoResult.tamil, autoResult.english);
    }
  );

  const handleSelectDemoGesture = (gestureId: string) => {
    setActiveDemoGestureId(gestureId);
    triggerDemoGesture(gestureId);
  };

  const handleClearDemo = () => {
    setActiveDemoGestureId(null);
    clearDemoGesture();
  };

  const handleToggleCamera = () => {
    if (cameraState === 'RUNNING') {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      
      {/* Demo Selector Banner when Demo Mode is Enabled */}
      {settings.isDemoMode && (
        <DemoSelector
          activeDemoId={activeDemoGestureId}
          onSelectGesture={handleSelectDemoGesture}
          onClearDemo={handleClearDemo}
        />
      )}

      {/* Main Two-Column Translator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Camera Card (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <CameraView
            videoRef={videoRef}
            canvasRef={canvasRef}
            cameraState={cameraState}
            errorMessage={errorMessage}
            handDetected={handDetected}
            handCount={handCount}
            devices={devices}
            selectedCameraId={settings.selectedCameraId}
            onSelectCamera={deviceId => onUpdateSettings({ ...settings, selectedCameraId: deviceId })}
            onRestartCamera={() => restartCamera(settings.selectedCameraId)}
            onToggleCamera={handleToggleCamera}
            showLandmarks={settings.showLandmarks}
            isDemoMode={settings.isDemoMode}
          />
        </div>

        {/* Right Column: Recognition Result & Voice Output (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <RecognitionResult
            result={currentResult}
            onClear={clearResult}
            onSpeakEnglish={() => currentResult && speakEnglish(currentResult.english)}
            onSpeakTamil={() => currentResult && speakTamil(currentResult.tamil, currentResult.english)}
            onStopVoice={stopVoice}
            isSpeaking={isSpeaking}
            hasTamilVoice={hasTamilVoice}
            warningMessage={speechWarning}
            onDismissWarning={clearWarning}
          />
        </div>

      </div>

      {/* Pipeline Status Stages Visualizer */}
      <PipelineStatus statusMap={pipelineStatus} />

      {/* System Monitor & Telemetry */}
      {settings.showTechDetails && (
        <SystemMonitor
          metrics={metrics}
          handDetected={handDetected}
          cameraActive={cameraState === 'RUNNING'}
          currentConfidence={currentResult ? currentResult.confidence : 0}
        />
      )}

    </div>
  );
};
