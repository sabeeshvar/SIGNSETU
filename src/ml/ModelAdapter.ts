export interface ModelPrediction {
  label: string;
  confidence: number;
  rawScores?: Record<string, number>;
}

export interface ModelAdapter {
  name: string;
  isNpuReady: boolean;
  initialize(): Promise<void>;
  predict(features: number[]): Promise<ModelPrediction>;
  dispose(): void;
}

/**
 * PrototypeModelAdapter
 * Fully local, deterministic, rule and geometric feature classifier.
 * Operates offline with zero external network downloads or model weight dependencies.
 */
export class PrototypeModelAdapter implements ModelAdapter {
  public name = 'Prototype Gesture Model Adapter';
  public isNpuReady = true;
  private isInitialized = false;

  async initialize(): Promise<void> {
    // Immediate local setup
    this.isInitialized = true;
  }

  async predict(features: number[]): Promise<ModelPrediction> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!features || features.length === 0) {
      return { label: 'UNKNOWN', confidence: 0 };
    }

    // Default placeholder prediction for raw feature vector (the primary classification is done via LandmarkProcessor & GestureClassifier)
    return {
      label: 'INITIALIZED',
      confidence: 0.85,
    };
  }

  dispose(): void {
    this.isInitialized = false;
  }
}

/**
 * FutureOnnxModelAdapter
 * Modular abstraction point for future ONNX Runtime Web / WebNN / Qualcomm / MediaTek NPU edge deployment.
 */
export class FutureOnnxModelAdapter implements ModelAdapter {
  public name = 'Future ONNX / WebNN Model Adapter';
  public isNpuReady = true;
  private modelPath: string;

  constructor(modelPath = '/models/signsetu_isl_v1.onnx') {
    this.modelPath = modelPath;
  }

  public getModelPath(): string {
    return this.modelPath;
  }

  async initialize(): Promise<void> {
    // Ready for onnxruntime-web session creation:
    // const session = await ort.InferenceSession.create(this.modelPath, { executionProviders: ['webnn', 'wasm'] });
  }

  async predict(_features: number[]): Promise<ModelPrediction> {
    return {
      label: 'UNKNOWN',
      confidence: 0,
    };
  }

  dispose(): void {
    // Release runtime tensor buffers
  }
}
