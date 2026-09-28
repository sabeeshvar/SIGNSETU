# SignSetu Architecture & System Design

SignSetu is an offline-first assistive communication application that translates Indian Sign Language (ISL) hand gestures into Tamil and English text and synthesized speech.

---

## 1. High-Level System Architecture

```
[ Web Camera Stream (30 FPS) ]
              │
              ▼
[ Hand Detector (@mediapipe/tasks-vision + Edge Fallback) ]
              │  Extracts 21 3D hand keypoints
              ▼
[ Landmark Processor (Translation & Scale Invariant Normalization) ]
              │  Calculates finger extensions, relative angles, palm facing
              ▼
[ ModelAdapter / Gesture Classifier (Deterministic Prototype Engine) ]
              │  Scores against 14 prototype ISL gesture rules
              ▼
[ Temporal Smoother (Sliding Buffer, Window=8, Min=4) ]
              │  Filters out transient frame jitter
              ▼
[ Confidence Evaluator (High ≥85%, Confirming 60-84%, Unknown <60%) ]
              │
      ┌───────┴─────────────────┐
      ▼                         ▼
[ English Output ]       [ Tamil Translation Dictionary ]
      │                         │
      ▼                         ▼
[ Speech Engine (EN) ]   [ Speech Engine (TA: Noto/Tamil Voice) ]
```

---

## 2. Component Structure

- **`src/app/`**: Root application shell, state synchronization, dark mode, persistent storage.
- **`src/vision/`**:
  - `CameraManager`: Hardware stream management via `navigator.mediaDevices.getUserMedia()`.
  - `HandDetector`: Real-time hand detector with MediaPipe HandLandmarker and edge heuristic fallback.
  - `landmarkRenderer`: 21-node hand skeleton canvas renderer.
- **`src/ml/`**:
  - `ModelAdapter`: Abstracted interface for plug-and-play model backends (Prototype, ONNX Web, WebNN, NPU).
  - `LandmarkProcessor`: Geometry and scale invariant normalization.
  - `GestureClassifier`: Deterministic morphology classifier.
  - `smoothing`: Temporal smoothing buffer.
  - `confidence`: Tri-tier confidence evaluator.
- **`src/services/`**:
  - `TranslationService`: Offline in-memory bilingual lexicon.
  - `SpeechService`: Browser Web Speech API with Tamil voice discovery and fallback.
  - `StorageService`: Persistent user settings and capped 20-item history log.
  - `PerformanceService`: Dynamic FPS calculation and pipeline latency benchmarking.
- **`src/data/`**:
  - `gestures`: Vocabulary definitions and structural rules.
  - `translations`: Tamil Unicode, transliterations, and context sentences.
  - `demoGestures`: Anatomical landmark presets for hackathon demo mode.

---

## 3. Data Flow Guarantees

- **No Remote Transmission**: Video frames remain in volatile browser canvas memory. No images or landmark coordinates are uploaded to external APIs.
- **Predictable Latency**: Processing occurs within 15–35 ms per frame on standard modern laptops and mobile devices.
