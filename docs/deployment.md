# SignSetu Edge NPU Deployment Guide

SignSetu is architected from the ground up for edge execution on low-power devices, neural accelerators, and embedded vision hardware.

---

## 1. Edge Acceleration Pipeline

```
┌─────────────────┐
│ 1. TRAIN MODEL  │ PyTorch / TensorFlow landmark sequence model (LSTM / Transformer / MLP)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. EXPORT MODEL │ Export to standard interchange format (ONNX / TFLite)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. QUANTIZATION │ Post-training INT8 / FP16 dynamic range quantization
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. EDGE RUNTIME │ WebNN API (W3C Standard) / ONNX Runtime Web / TFLite WebAssembly
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. NPU ACCEL    │ On-device Neural Processing Unit (Qualcomm NPU / Apple Neural Engine / Intel NPU)
└─────────────────┘
```

---

## 2. Model Adapter Abstraction

The code decouples vision and UI from the concrete inference engine using the `ModelAdapter` interface:

```typescript
export interface ModelPrediction {
  label: string;
  confidence: number;
}

export interface ModelAdapter {
  name: string;
  isNpuReady: boolean;
  initialize(): Promise<void>;
  predict(features: number[]): Promise<ModelPrediction>;
  dispose(): void;
}
```

### Implementations:
- **`PrototypeModelAdapter`**: Fully local morphological rule engine requiring 0 MB downloads, ideal for prototype reliability and offline hackathons.
- **`FutureOnnxModelAdapter`**: Plug-in point for quantized `.onnx` models utilizing ONNX Runtime Web with WebNN execution provider.

---

## 3. WebNN and Hardware Targets

When WebNN reaches standard availability across Chromium browsers, `FutureOnnxModelAdapter` can configure:

```typescript
const session = await ort.InferenceSession.create('/models/signsetu_isl_v1.onnx', {
  executionProviders: ['webnn', 'wasm'],
  providerOptions: {
    webnn: {
      deviceType: 'npu', // Direct NPU dispatch
      powerPreference: 'low-power',
    },
  },
});
```
