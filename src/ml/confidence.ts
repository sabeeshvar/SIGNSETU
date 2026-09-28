import type { ConfidenceLevel } from '../types/recognition';

export const HIGH_CONFIDENCE_THRESHOLD = 85;
export const CONFIRMING_THRESHOLD = 60;

/**
 * Determines confidence tier based on percentage score (0 - 100)
 */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  const normalizedScore = score <= 1 ? score * 100 : score;

  if (normalizedScore >= HIGH_CONFIDENCE_THRESHOLD) {
    return 'high';
  }
  if (normalizedScore >= CONFIRMING_THRESHOLD) {
    return 'confirming';
  }
  return 'unknown';
}

/**
 * Provides an accessibility / guidance message depending on confidence tier
 */
export function getConfidenceAdvice(level: ConfidenceLevel): string {
  switch (level) {
    case 'high':
      return 'Stable recognition. Voice ready.';
    case 'confirming':
      return 'Hold the gesture steady to confirm.';
    case 'unknown':
    default:
      return 'No recognizable sign. Keep hand inside camera frame.';
  }
}
