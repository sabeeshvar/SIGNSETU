export type CameraState = 'INITIALIZING' | 'READY' | 'RUNNING' | 'STOPPED' | 'ERROR';

export interface CameraDeviceInfo {
  deviceId: string;
  label: string;
}

export interface SystemMetrics {
  fps: number;
  inferenceLatencyMs: number;
  detectionLatencyMs: number;
  recognitionLatencyMs: number;
  totalPipelineLatencyMs: number;
  isSimulated: boolean;
}

export interface AppSettings {
  selectedCameraId: string;
  primaryLanguage: 'ta' | 'en';
  autoVoiceEnabled: boolean;
  confidenceThreshold: number; // e.g. 70
  isDemoMode: boolean;
  showLandmarks: boolean;
  showTechDetails: boolean;
  darkMode: boolean;
  smoothingWindow: number; // e.g. 6
  minStableCount: number; // e.g. 4
}
