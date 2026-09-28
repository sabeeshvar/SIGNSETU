import type { LandmarkPoint } from '../types/recognition';
import { normalizeLandmarks, extractFeatureVector, extractFingerStates } from '../utils/normalization';
import { calculateDistance } from '../utils/geometry';

export interface ProcessedLandmarks {
  raw: LandmarkPoint[];
  normalized: LandmarkPoint[];
  featureVector: number[];
  fingerStates: {
    thumb: boolean;
    index: boolean;
    middle: boolean;
    ring: boolean;
    pinky: boolean;
  };
  orientation: 'upright' | 'horizontal' | 'downward';
  palmFacing: 'camera' | 'away' | 'side';
  wristToMiddleMcpAngle: number;
}

export class LandmarkProcessor {
  /**
   * Validates and processes 21 hand landmarks into rich geometric features
   */
  public static process(landmarks: LandmarkPoint[]): ProcessedLandmarks | null {
    if (!landmarks || landmarks.length < 21) {
      return null;
    }

    const normalized = normalizeLandmarks(landmarks);
    const featureVector = extractFeatureVector(landmarks);
    const fingerStates = extractFingerStates(landmarks);

    const wrist = landmarks[0];
    const middleMcp = landmarks[9];
    const indexMcp = landmarks[5];
    const pinkyMcp = landmarks[17];

    // Determine hand orientation vector from wrist to middle finger knuckle
    const dy = middleMcp.y - wrist.y;
    const dx = middleMcp.x - wrist.x;

    let orientation: 'upright' | 'horizontal' | 'downward' = 'upright';
    if (Math.abs(dx) > Math.abs(dy) * 1.2) {
      orientation = 'horizontal';
    } else if (dy > 0.08) {
      orientation = 'downward';
    } else {
      orientation = 'upright';
    }

    // Determine palm direction (cross product of index-to-wrist and pinky-to-wrist)
    const palmWidth = calculateDistance(indexMcp, pinkyMcp);
    const palmFacing: 'camera' | 'away' | 'side' = palmWidth < 0.05 ? 'side' : 'camera';

    // Wrist to middle knuckle angle relative to vertical
    const angleRad = Math.atan2(dy, dx);
    const wristToMiddleMcpAngle = (angleRad * 180) / Math.PI;

    return {
      raw: landmarks,
      normalized,
      featureVector,
      fingerStates,
      orientation,
      palmFacing,
      wristToMiddleMcpAngle,
    };
  }
}
