/**
 * Formats confidence value (0..1 or 0..100) to percentage string
 */
export function formatConfidence(confidence: number): string {
  const percentage = confidence <= 1 ? Math.round(confidence * 100) : Math.round(confidence);
  return `${percentage}%`;
}

/**
 * Formats latency number to readable ms
 */
export function formatLatency(ms: number): string {
  if (ms <= 0) return '< 1 ms';
  if (ms < 10) return `${ms.toFixed(1)} ms`;
  return `${Math.round(ms)} ms`;
}

/**
 * Formats FPS number to readable string
 */
export function formatFPS(fps: number): string {
  if (fps <= 0) return '0 FPS';
  return `${Math.round(fps)} FPS`;
}

/**
 * Formats epoch timestamp into clean time string (e.g., 10:32 PM)
 */
export function formatTimeString(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
