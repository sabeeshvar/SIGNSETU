import type { ProcessedLandmarks } from './LandmarkProcessor';
import { SUPPORTED_GESTURES } from '../data/gestures';
import { calculateDistance } from '../utils/geometry';

export interface ClassificationMatch {
  gestureId: string;
  english: string;
  tamil: string;
  confidence: number;
  classifierName: string;
  matchedFeatures: string[];
}

export class GestureClassifier {
  public static readonly CLASSIFIER_NAME = 'Prototype Gesture Classifier';

  /**
   * Deterministically classifies a processed hand based on geometric rules and landmark morphology
   */
  public static classify(processed: ProcessedLandmarks): ClassificationMatch | null {
    if (!processed) return null;

    const { fingerStates, orientation, raw } = processed;
    const { thumb, index, middle, ring, pinky } = fingerStates;

    const matches: { id: string; score: number; features: string[] }[] = [];

    // Helper: calculate distance between thumb tip (4) and index tip (8)
    const thumbToIndexDist = calculateDistance(raw[4], raw[8]);
    const thumbToMiddleDist = calculateDistance(raw[4], raw[12]);
    const isPinching = thumbToIndexDist < 0.06 && thumbToMiddleDist < 0.08;

    // Check 1: FOOD (Pinch / Eating shape)
    if (isPinching) {
      matches.push({
        id: 'food',
        score: 0.93 - (thumbToIndexDist * 2),
        features: ['fingertips converged to thumb tip', 'eating sign shape'],
      });
    }

    // Check 2: HOSPITAL (Index point up, others folded)
    if (index && !middle && !ring && !pinky && orientation === 'upright') {
      const score = thumb ? 0.86 : 0.94;
      matches.push({
        id: 'hospital',
        score,
        features: ['index finger extended vertically', 'other fingers folded'],
      });
    }

    // Check 3: HOME (V-Sign / Peace sign: Index + Middle extended, others folded)
    if (index && middle && !ring && !pinky && orientation === 'upright') {
      // Check spread between index and middle
      const spread = calculateDistance(raw[8], raw[12]);
      const score = spread > 0.04 ? 0.94 : 0.88;
      matches.push({
        id: 'home',
        score,
        features: ['index and middle extended in V-shape', 'ring and pinky folded'],
      });
    }

    // Check 4: WATER ("W" Sign: Index + Middle + Ring extended, pinky folded)
    if (index && middle && ring && !pinky && orientation === 'upright') {
      matches.push({
        id: 'water',
        score: 0.92,
        features: ['three middle fingers extended ("W" shape)', 'pinky tucked'],
      });
    }

    // Check 5: GOOD or HELP (Thumbs-Up upright)
    if (thumb && !index && !middle && !ring && !pinky && orientation === 'upright') {
      // Thumb tip (4) should be higher than thumb MCP (2)
      if (raw[4].y < raw[2].y) {
        matches.push({
          id: 'good',
          score: 0.95,
          features: ['thumb vertically extended upward', 'four fingers closed in fist'],
        });
        matches.push({
          id: 'help',
          score: 0.91,
          features: ['upward thumb gesture', 'fist foundation'],
        });
      }
    }

    // Check 6: BAD (Thumbs-Down downward)
    if (thumb && !index && !middle && !ring && !pinky && orientation === 'downward') {
      if (raw[4].y > raw[2].y) {
        matches.push({
          id: 'bad',
          score: 0.94,
          features: ['thumb pointing downward', 'fist closed'],
        });
      }
    }

    // Check 7: YES (Closed fist upright)
    if (!index && !middle && !ring && !pinky && !thumb && orientation === 'upright') {
      matches.push({
        id: 'yes',
        score: 0.93,
        features: ['all fingers curled tightly into fist', 'wrist upright'],
      });
    }

    // Check 8: NO (Index & Middle extended horizontally)
    if (index && middle && !ring && !pinky && orientation === 'horizontal') {
      matches.push({
        id: 'no',
        score: 0.91,
        features: ['index and middle extended horizontally', 'horizontal hand orientation'],
      });
    }

    // Check 9: HELLO or STOP (All fingers extended upright)
    if (index && middle && ring && pinky && orientation === 'upright') {
      matches.push({
        id: 'hello',
        score: 0.95,
        features: ['open upright palm', 'all 5 digits extended', 'upright presentation'],
      });
      matches.push({
        id: 'stop',
        score: 0.89,
        features: ['open vertical palm facing forward'],
      });
    }

    // Check 10: PLEASE or THANK YOU or SCHOOL (All fingers extended, horizontal or side)
    if (index && middle && ring && pinky && orientation === 'horizontal') {
      matches.push({
        id: 'please',
        score: 0.92,
        features: ['flat horizontal hand', 'all fingers aligned'],
      });
      matches.push({
        id: 'thank_you',
        score: 0.89,
        features: ['flat open hand outward'],
      });
      matches.push({
        id: 'school',
        score: 0.87,
        features: ['horizontal slate palm'],
      });
    }

    if (matches.length === 0) {
      return null;
    }

    // Sort by confidence score descending
    matches.sort((a, b) => b.score - a.score);
    const topMatch = matches[0];

    const gestureDef = SUPPORTED_GESTURES.find(g => g.id === topMatch.id);
    if (!gestureDef) return null;

    return {
      gestureId: gestureDef.id,
      english: gestureDef.english,
      tamil: gestureDef.tamil,
      confidence: topMatch.score,
      classifierName: GestureClassifier.CLASSIFIER_NAME,
      matchedFeatures: topMatch.features,
    };
  }
}
