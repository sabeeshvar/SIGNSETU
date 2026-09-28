import type { LandmarkPoint } from '../types/recognition';
import { calculateDistance } from './geometry';

/**
 * Normalizes 21 hand landmarks:
 * 1. Translates wrist (index 0) to origin (0, 0, 0)
 * 2. Normalizes scale using the distance between wrist (0) and middle MCP (9)
 * 3. Keeps feature coordinates position & distance invariant
 */
export function normalizeLandmarks(landmarks: LandmarkPoint[]): LandmarkPoint[] {
  if (!landmarks || landmarks.length < 21) {
    return [];
  }

  const wrist = landmarks[0];
  const middleMcp = landmarks[9];

  // Palm reference scale
  let palmScale = calculateDistance(wrist, middleMcp, true);
  if (palmScale < 0.001) {
    palmScale = 0.15; // default fallback scale
  }

  return landmarks.map(p => ({
    x: (p.x - wrist.x) / palmScale,
    y: (p.y - wrist.y) / palmScale,
    z: ((p.z || 0) - (wrist.z || 0)) / palmScale,
  }));
}

/**
 * Converts normalized landmarks into a 1D feature vector for ML model inference
 * Shape: 63 features (21 landmarks * 3 coords [x, y, z])
 */
export function extractFeatureVector(landmarks: LandmarkPoint[]): number[] {
  const normalized = normalizeLandmarks(landmarks);
  if (normalized.length !== 21) {
    return new Array(63).fill(0);
  }

  const vector: number[] = [];
  normalized.forEach(pt => {
    vector.push(pt.x);
    vector.push(pt.y);
    vector.push(pt.z);
  });

  return vector;
}

/**
 * Computes individual finger extension ratios (0 = fully curled, 1 = fully extended)
 * Uses relative distance of fingertip to wrist vs knuckle to wrist
 */
export function extractFingerStates(landmarks: LandmarkPoint[]): {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
} {
  if (!landmarks || landmarks.length < 21) {
    return { thumb: false, index: false, middle: false, ring: false, pinky: false };
  }

  const wrist = landmarks[0];

  // Thumb: tip (4) vs IP (3) and MCP (2)
  const thumbTipDist = calculateDistance(landmarks[4], wrist);
  const thumbMcpDist = calculateDistance(landmarks[2], wrist);
  const thumbExtended = thumbTipDist > thumbMcpDist * 1.25;

  // Index: tip (8) vs PIP (6)
  const indexTipDist = calculateDistance(landmarks[8], wrist);
  const indexPipDist = calculateDistance(landmarks[6], wrist);
  const indexExtended = indexTipDist > indexPipDist * 1.15;

  // Middle: tip (12) vs PIP (10)
  const middleTipDist = calculateDistance(landmarks[12], wrist);
  const middlePipDist = calculateDistance(landmarks[10], wrist);
  const middleExtended = middleTipDist > middlePipDist * 1.15;

  // Ring: tip (16) vs PIP (14)
  const ringTipDist = calculateDistance(landmarks[16], wrist);
  const ringPipDist = calculateDistance(landmarks[14], wrist);
  const ringExtended = ringTipDist > ringPipDist * 1.15;

  // Pinky: tip (20) vs PIP (18)
  const pinkyTipDist = calculateDistance(landmarks[20], wrist);
  const pinkyPipDist = calculateDistance(landmarks[18], wrist);
  const pinkyExtended = pinkyTipDist > pinkyPipDist * 1.15;

  return {
    thumb: thumbExtended,
    index: indexExtended,
    middle: middleExtended,
    ring: ringExtended,
    pinky: pinkyExtended,
  };
}
