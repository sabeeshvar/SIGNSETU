import { useState, useEffect, useRef, useCallback } from 'react';
import { HandDetector } from '../vision/HandDetector';
import { GestureRecognizer } from '../ml/GestureRecognizer';
import { PerformanceService } from '../services/PerformanceService';
import { StorageService } from '../services/StorageService';
import { drawLandmarks } from '../vision/landmarkRenderer';
import type { RecognitionResult, PipelineStatusMap } from '../types/recognition';
import type { SystemMetrics, AppSettings } from '../types/system';

export function useGestureRecognition(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  settings: AppSettings,
  onAutoVoice?: (result: RecognitionResult) => void
) {
  const [currentResult, setCurrentResult] = useState<RecognitionResult | null>(null);
  const [handDetected, setHandDetected] = useState(false);
  const [handCount, setHandCount] = useState(0);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    fps: 0,
    inferenceLatencyMs: 0,
    detectionLatencyMs: 0,
    recognitionLatencyMs: 0,
    totalPipelineLatencyMs: 0,
    isSimulated: false,
  });

  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatusMap>({
    camera: { state: 'processing', label: 'Camera Active' },
    detection: { state: 'inactive', label: 'Hand Detection' },
    landmarks: { state: 'inactive', label: 'Landmark Extraction' },
    recognition: { state: 'inactive', label: 'Gesture Recognition' },
    translation: { state: 'inactive', label: 'Tamil Translation' },
    voice: { state: 'inactive', label: 'Voice Pipeline' },
  });

  const detectorRef = useRef<HandDetector | null>(null);
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const perfRef = useRef<PerformanceService | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastRecordedResultRef = useRef<string | null>(null);
  const lastRecordTimeRef = useRef<number>(0);

  // Initialize detector and recognizer
  useEffect(() => {
    detectorRef.current = new HandDetector();
    recognizerRef.current = new GestureRecognizer(
      undefined,
      settings.smoothingWindow,
      settings.minStableCount
    );
    perfRef.current = new PerformanceService();

    detectorRef.current.initialize();
    recognizerRef.current.initialize();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
      if (recognizerRef.current) {
        recognizerRef.current.dispose();
      }
    };
  }, []);

  // Update smoothing configuration when settings change
  useEffect(() => {
    if (recognizerRef.current) {
      recognizerRef.current.updateSmoothingConfig(
        settings.smoothingWindow,
        settings.minStableCount
      );
    }
  }, [settings.smoothingWindow, settings.minStableCount]);

  // Main processing loop
  const processFrame = useCallback(async () => {
    if (!perfRef.current) return;
    perfRef.current.recordFrame();

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const detector = detectorRef.current;
    const recognizer = recognizerRef.current;

    const frameStartTime = performance.now();

    if (canvas && video && video.readyState >= 2) {
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
      }
    }

    if (detector && recognizer) {
      // 1. Hand Detection
      const detectionStart = performance.now();
      const detectionResult = await detector.detect(video, frameStartTime);
      const detectionDuration = performance.now() - detectionStart;

      const hasHands = detectionResult.landmarks.length > 0;
      setHandDetected(hasHands);
      setHandCount(detectionResult.handCount);

      // Render landmarks onto canvas overlay
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (hasHands && settings.showLandmarks) {
            detectionResult.landmarks.forEach(landmarks => {
              drawLandmarks(ctx, landmarks, canvas.width, canvas.height, {
                mirror: true,
              });
            });
          }
        }
      }

      // 2. Landmark & Gesture Recognition
      let recognitionResult: RecognitionResult | null = null;
      let recognitionDuration = 0;

      if (hasHands) {
        const recStart = performance.now();
        recognitionResult = await recognizer.processFrame(detectionResult.landmarks);
        recognitionDuration = performance.now() - recStart;
      } else {
        recognizer.reset();
      }

      const totalPipelineDuration = performance.now() - frameStartTime;
      perfRef.current.recordMetrics(detectionDuration, recognitionDuration, totalPipelineDuration);
      setMetrics(perfRef.current.getMetrics(detectionResult.backend === 'demo'));

      // 3. Update Pipeline Stages State
      setPipelineStatus({
        camera: { state: video && video.readyState >= 2 ? 'complete' : 'processing', label: 'Camera Stream' },
        detection: {
          state: hasHands ? 'complete' : 'processing',
          label: hasHands ? `${detectionResult.handCount} Hand(s) Detected` : 'Scanning for Hands',
        },
        landmarks: {
          state: hasHands ? 'complete' : 'inactive',
          label: hasHands ? '21 Landmarks Extracted' : 'No Landmark Points',
        },
        recognition: {
          state: recognitionResult && recognitionResult.confidence * 100 >= settings.confidenceThreshold
            ? 'complete'
            : (hasHands ? 'processing' : 'inactive'),
          label: recognitionResult ? `${recognitionResult.english}` : 'Evaluating Sign',
        },
        translation: {
          state: recognitionResult ? 'complete' : 'inactive',
          label: recognitionResult ? `${recognitionResult.tamil}` : 'Translation Ready',
        },
        voice: {
          state: settings.autoVoiceEnabled && recognitionResult?.level === 'high' ? 'complete' : 'inactive',
          label: settings.autoVoiceEnabled ? 'Auto-Voice Enabled' : 'Voice Ready',
        },
      });

      // 4. Handle Result & History persistence
      if (recognitionResult) {
        setCurrentResult(recognitionResult);

        // Record to history if high confidence, stable, and not immediately repeated in 3 seconds
        const now = Date.now();
        if (
          recognitionResult.level === 'high' &&
          (lastRecordedResultRef.current !== recognitionResult.english || now - lastRecordTimeRef.current > 4000)
        ) {
          lastRecordedResultRef.current = recognitionResult.english;
          lastRecordTimeRef.current = now;

          StorageService.addHistoryItem({
            english: recognitionResult.english,
            tamil: recognitionResult.tamil,
            confidence: Math.round(recognitionResult.confidence * 100),
            timestamp: now,
            timeString: new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          });

          if (settings.autoVoiceEnabled && onAutoVoice) {
            onAutoVoice(recognitionResult);
          }
        }
      } else if (!hasHands) {
        setCurrentResult(null);
      }
    }

    animationFrameId.current = requestAnimationFrame(processFrame);
  }, [videoRef, canvasRef, settings, onAutoVoice]);

  // Start animation loop
  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(processFrame);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [processFrame]);

  // Trigger demo gesture
  const triggerDemoGesture = useCallback((gestureId: string) => {
    if (detectorRef.current) {
      detectorRef.current.setDemoGesture(gestureId);
    }
  }, []);

  const clearDemoGesture = useCallback(() => {
    if (detectorRef.current) {
      detectorRef.current.setDemoGesture(null);
    }
    if (recognizerRef.current) {
      recognizerRef.current.reset();
    }
    setCurrentResult(null);
  }, []);

  return {
    currentResult,
    handDetected,
    handCount,
    metrics,
    pipelineStatus,
    triggerDemoGesture,
    clearDemoGesture,
    clearResult: () => {
      if (recognizerRef.current) recognizerRef.current.reset();
      setCurrentResult(null);
    },
  };
}
