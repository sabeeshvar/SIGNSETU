import type { SystemMetrics } from '../types/system';

export class PerformanceService {
  private frameTimestamps: number[] = [];
  private readonly maxFrameSamples = 20;

  private detectionLatencies: number[] = [];
  private recognitionLatencies: number[] = [];
  private pipelineLatencies: number[] = [];
  private readonly maxLatencySamples = 10;

  /**
   * Records a frame render for dynamic rolling FPS calculation
   */
  public recordFrame(): void {
    const now = performance.now();
    this.frameTimestamps.push(now);
    if (this.frameTimestamps.length > this.maxFrameSamples) {
      this.frameTimestamps.shift();
    }
  }

  /**
   * Records stage latencies in milliseconds
   */
  public recordMetrics(detectionMs: number, recognitionMs: number, totalPipelineMs: number): void {
    this.detectionLatencies.push(detectionMs);
    if (this.detectionLatencies.length > this.maxLatencySamples) this.detectionLatencies.shift();

    this.recognitionLatencies.push(recognitionMs);
    if (this.recognitionLatencies.length > this.maxLatencySamples) this.recognitionLatencies.shift();

    this.pipelineLatencies.push(totalPipelineMs);
    if (this.pipelineLatencies.length > this.maxLatencySamples) this.pipelineLatencies.shift();
  }

  /**
   * Returns current rolling metrics
   */
  public getMetrics(isSimulated = false): SystemMetrics {
    // Calculate FPS based on rolling average frame intervals
    let fps = 0;
    if (this.frameTimestamps.length >= 2) {
      const duration = this.frameTimestamps[this.frameTimestamps.length - 1] - this.frameTimestamps[0];
      if (duration > 0) {
        fps = ((this.frameTimestamps.length - 1) / duration) * 1000;
      }
    }

    const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

    const detectionLatencyMs = avg(this.detectionLatencies);
    const recognitionLatencyMs = avg(this.recognitionLatencies);
    const totalPipelineLatencyMs = avg(this.pipelineLatencies);

    return {
      fps: Math.min(60, Math.max(0, fps)),
      inferenceLatencyMs: recognitionLatencyMs,
      detectionLatencyMs,
      recognitionLatencyMs,
      totalPipelineLatencyMs,
      isSimulated,
    };
  }

  public reset(): void {
    this.frameTimestamps = [];
    this.detectionLatencies = [];
    this.recognitionLatencies = [];
    this.pipelineLatencies = [];
  }
}
