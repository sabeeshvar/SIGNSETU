export interface LandmarkPoint {
  x: number;
  y: number;
  z: number;
}

export type HandLandmarks = LandmarkPoint[];

export type ConfidenceLevel = 'high' | 'confirming' | 'unknown';

export interface RecognitionResult {
  gestureId: string;
  english: string;
  tamil: string;
  confidence: number;
  level: ConfidenceLevel;
  timestamp: number;
  isDemo?: boolean;
  handCount: number;
  explanation?: string;
}

export interface RecognitionHistoryItem {
  id: string;
  timestamp: number;
  english: string;
  tamil: string;
  confidence: number;
  timeString: string;
}

export type PipelineStage = 
  | 'camera' 
  | 'detection' 
  | 'landmarks' 
  | 'recognition' 
  | 'translation' 
  | 'voice';

export type StageState = 'inactive' | 'processing' | 'complete' | 'error';

export interface StageStatus {
  state: StageState;
  label: string;
  message?: string;
}

export type PipelineStatusMap = Record<PipelineStage, StageStatus>;
