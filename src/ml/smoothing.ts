export interface PredictionEntry {
  label: string;
  confidence: number;
  timestamp: number;
}

export class TemporalSmoother {
  private windowSize: number;
  private minStableCount: number;
  private history: PredictionEntry[] = [];
  private lastStablePrediction: string | null = null;

  constructor(windowSize = 8, minStableCount = 5) {
    this.windowSize = windowSize;
    this.minStableCount = minStableCount;
  }

  public updateConfig(windowSize: number, minStableCount: number): void {
    this.windowSize = Math.max(3, windowSize);
    this.minStableCount = Math.max(2, Math.min(minStableCount, this.windowSize));
  }

  /**
   * Adds an instant frame prediction to buffer and returns the smoothed result if stable
   */
  public addPrediction(label: string, confidence: number): {
    stableLabel: string | null;
    stableConfidence: number;
    isNewlyStable: boolean;
  } {
    const now = Date.now();
    this.history.push({ label, confidence, timestamp: now });

    // Keep history clamped to windowSize
    if (this.history.length > this.windowSize) {
      this.history.shift();
    }

    // Tally occurrences within current sliding window
    const counts = new Map<string, { count: number; totalConfidence: number }>();
    for (const item of this.history) {
      if (item.label === 'UNKNOWN' || item.confidence < 0.4) continue;
      const current = counts.get(item.label) || { count: 0, totalConfidence: 0 };
      counts.set(item.label, {
        count: current.count + 1,
        totalConfidence: current.totalConfidence + item.confidence,
      });
    }

    // Find the candidate with highest count
    let bestCandidate: string | null = null;
    let maxCount = 0;
    let avgConfidence = 0;

    for (const [candidate, data] of counts.entries()) {
      if (data.count > maxCount) {
        maxCount = data.count;
        bestCandidate = candidate;
        avgConfidence = data.totalConfidence / data.count;
      }
    }

    // Check if the best candidate meets the stability threshold
    if (bestCandidate && maxCount >= this.minStableCount) {
      const isNewlyStable = this.lastStablePrediction !== bestCandidate;
      this.lastStablePrediction = bestCandidate;
      return {
        stableLabel: bestCandidate,
        stableConfidence: avgConfidence,
        isNewlyStable,
      };
    }

    return {
      stableLabel: null,
      stableConfidence: 0,
      isNewlyStable: false,
    };
  }

  public reset(): void {
    this.history = [];
    this.lastStablePrediction = null;
  }

  public getLastStable(): string | null {
    return this.lastStablePrediction;
  }
}
