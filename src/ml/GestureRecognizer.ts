import type { HandLandmarks, RecognitionResult } from '../types/recognition';
import { LandmarkProcessor } from './LandmarkProcessor';
import { GestureClassifier } from './GestureClassifier';
import { TemporalSmoother } from './smoothing';
import { getConfidenceLevel } from './confidence';
import type { ModelAdapter } from './ModelAdapter';
import { PrototypeModelAdapter } from './ModelAdapter';
import { SUPPORTED_GESTURES } from '../data/gestures';

export interface GestureRecognizerInterface {
  initialize(): Promise<void>;
  processFrame(landmarksList: HandLandmarks[]): Promise<RecognitionResult | null>;
  predict(features: number[]): Promise<RecognitionResult | null>;
  getConfidence(): number;
  reset(): void;
  dispose(): void;
}

export class GestureRecognizer implements GestureRecognizerInterface {
  private modelAdapter: ModelAdapter;
  private smoother: TemporalSmoother;
  private currentConfidence = 0;
  private isReady = false;

  constructor(modelAdapter?: ModelAdapter, windowSize = 8, minStableCount = 4) {
    this.modelAdapter = modelAdapter || new PrototypeModelAdapter();
    this.smoother = new TemporalSmoother(windowSize, minStableCount);
  }

  public async initialize(): Promise<void> {
    await this.modelAdapter.initialize();
    this.smoother.reset();
    this.isReady = true;
  }

  public updateSmoothingConfig(windowSize: number, minStableCount: number): void {
    this.smoother.updateConfig(windowSize, minStableCount);
  }

  public async processFrame(landmarksList: HandLandmarks[]): Promise<RecognitionResult | null> {
    if (!this.isReady || !landmarksList || landmarksList.length === 0) {
      this.currentConfidence = 0;
      return null;
    }

    // Process primary hand (index 0)
    const primaryHand = landmarksList[0];
    const processed = LandmarkProcessor.process(primaryHand);
    if (!processed) {
      this.currentConfidence = 0;
      return null;
    }

    // Classify using deterministic geometric features
    const classification = GestureClassifier.classify(processed);
    if (!classification) {
      this.smoother.addPrediction('UNKNOWN', 0);
      this.currentConfidence = 0;
      return null;
    }

    // Feed through temporal smoother buffer
    const smoothed = this.smoother.addPrediction(
      classification.gestureId,
      classification.confidence
    );

    const stableId = smoothed.stableLabel || classification.gestureId;
    const confidence = smoothed.stableLabel ? smoothed.stableConfidence : classification.confidence * 0.75;
    this.currentConfidence = confidence;

    const gestureDef = SUPPORTED_GESTURES.find(g => g.id === stableId);
    if (!gestureDef) {
      return null;
    }

    const level = getConfidenceLevel(confidence * 100);

    return {
      gestureId: gestureDef.id,
      english: gestureDef.english,
      tamil: gestureDef.tamil,
      confidence,
      level,
      timestamp: Date.now(),
      handCount: landmarksList.length,
      explanation: classification.matchedFeatures.join(', '),
    };
  }

  public async predict(features: number[]): Promise<RecognitionResult | null> {
    const prediction = await this.modelAdapter.predict(features);
    this.currentConfidence = prediction.confidence;
    const gestureDef = SUPPORTED_GESTURES.find(g => g.id.toLowerCase() === prediction.label.toLowerCase());

    if (!gestureDef) return null;

    return {
      gestureId: gestureDef.id,
      english: gestureDef.english,
      tamil: gestureDef.tamil,
      confidence: prediction.confidence,
      level: getConfidenceLevel(prediction.confidence * 100),
      timestamp: Date.now(),
      handCount: 1,
    };
  }

  public getConfidence(): number {
    return this.currentConfidence;
  }

  public reset(): void {
    this.smoother.reset();
    this.currentConfidence = 0;
  }

  public dispose(): void {
    this.modelAdapter.dispose();
    this.reset();
    this.isReady = false;
  }
}
