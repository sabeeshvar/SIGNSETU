# SignSetu (சைன்சேது)

> **"Bridging Signs to Voices"** — Offline Indian Sign Language → Tamil / English Voice Translator.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Offline First](https://img.shields.io/badge/architecture-offline--first-blue)]()
[![Tamil Unicode](https://img.shields.io/badge/language-Tamil%20%7C%20English-emerald)]()
[![NPU Ready](https://img.shields.io/badge/edge-NPU--ready-purple)]()

SignSetu is an offline-first assistive communication application that translates Indian Sign Language (ISL) hand gestures into Tamil and English text and synthesized speech. It operates 100% locally in the browser with zero cloud dependencies, protecting user privacy and functioning reliably in environments without internet access.

---

## 1. Problem Statement

Everyday communication can be daunting for Deaf, hard-of-hearing, and non-speaking individuals, particularly in public spaces, hospitals, transit hubs, and educational institutions. Certified sign language interpreters are scarce, and existing AI translators often mandate persistent high-speed internet connections, upload sensitive camera streams to third-party cloud servers, or lack support for regional Indian languages such as Tamil.

---

## 2. The Solution

SignSetu bridges this communication divide through:
1. **On-Device Computer Vision**: Real-time 21 hand landmark tracking.
2. **Deterministic Gesture Morphology**: Normalized scale- and translation-invariant geometric feature classification.
3. **Temporal Smoothing**: Sliding window stabilization to eliminate flickering predictions.
4. **Bilingual Translation**: Seamless instant conversion from sign to crisp Tamil Unicode (e.g., "வணக்கம்", "நன்றி") and English text.
5. **Local Speech Synthesis**: Native browser speech engine output (`window.speechSynthesis`) with Tamil voice discovery and fallback handling.
6. **Privacy-Preserving Edge Architecture**: Zero video or biometric frames ever leave the user's device.

---

## 3. Supported Prototype Vocabulary

The initial release focuses on 14 essential communication, emergency, necessity, and navigational gestures:

| Gesture (English) | Tamil Translation (தமிழ்) | Transliteration | Category | Description |
| :--- | :--- | :--- | :--- | :--- |
| **HELLO** | **வணக்கம்** | Vanakkam | Communication | Open upright palm facing forward |
| **THANK YOU** | **நன்றி** | Nandri | Social | Flat hand moving outward |
| **YES** | **ஆம்** | Aam | Communication | Closed fist upright |
| **NO** | **இல்லை** | Illai | Communication | Horizontal index & middle finger |
| **HELP** | **உதவி** | Uthavi | Emergency | Upright thumbs-up gesture |
| **STOP** | **நிறுத்து** | Nirutthu | Emergency | Firm vertical palm forward |
| **PLEASE** | **தயவு செய்து** | Thayavu Seithu | Social | Open horizontal tilted palm |
| **GOOD** | **நல்லது** | Nallathu | Communication | Vertical thumbs-up |
| **BAD** | **மோசம்** | Mosam | Communication | Inverted thumbs-down |
| **WATER** | **தண்ணீர்** | Thanneer | Necessity | "W" shape (3 middle fingers extended) |
| **FOOD** | **உணவு** | Unavu | Necessity | Converged fingertips to thumb (eating pinch) |
| **HOME** | **வீடு** | Veedu | Location | "V" peace sign roof shape |
| **SCHOOL** | **பள்ளி** | Palli | Location | Flat horizontal slate palm |
| **HOSPITAL** | **மருத்துவமனை** | Maruthuvamanai | Location | Single vertical index finger point |

> *Note: This represents a structured prototype vocabulary for hackathon demonstration and does not claim full coverage of the complete grammatical lexicon of Indian Sign Language.*

---

## 4. System Architecture

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

## 5. Technology Stack

- **Frontend Core**: React 19, TypeScript (Strict Mode), Vite 8
- **Styling**: Tailwind CSS, Custom Glassmorphism, Google Fonts (*Inter* & *Noto Sans Tamil*)
- **Icons**: Lucide React
- **Computer Vision**: MediaPipe Tasks Vision (`@mediapipe/tasks-vision`) with local offline edge heuristic fallback
- **Machine Learning**: Decoupled `ModelAdapter` interface with `PrototypeModelAdapter` and `FutureOnnxModelAdapter`
- **Speech**: W3C Web Speech API (`window.speechSynthesis`)
- **Storage**: `localStorage` (persisting user preferences and capped 20-item recognition history)
- **Testing**: Vitest unit test suite

---

## 6. Installation & Running

### Prerequisites
- Node.js (v18+ recommended, tested on Node v24)
- npm or pnpm

### Clone and Install
```bash
git clone https://github.com/your-repo/signsetu.git
cd signsetu
npm install
```

### Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Run Unit Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 7. Offline Architecture & Privacy

SignSetu executes entirely client-side:
- **Zero Cloud APIs**: Does not call OpenAI, Google Cloud, Firebase, or external translation endpoints.
- **Zero Video Uploads**: Video frames never leave your GPU/CPU volatile memory.
- **Local Assets**: All lexicon data and morphological rules are bundled with the client application.

---

## 8. Hackathon Presentation & Demo Mode

Lighting at presentation podiums or restricted camera permissions can sometimes hinder live demos. SignSetu includes a dedicated **DEMO MODE**:
1. Click the **DEMO MODE** badge in the header or toggle it in Settings.
2. An interactive gesture tray appears featuring all 14 supported gestures.
3. Clicking any gesture (e.g. **HELLO**, **HELP**, **WATER**) injects authentic, living 21-landmark coordinates through the real pipeline.
4. Watch the **Pipeline Visualizer** advance through *Camera* → *Detection* → *Landmarks* → *Recognition* → *Translation* → *Speech*.
5. Listen to instantaneous Tamil voice audio or click the **குரல் (Tamil)** button.

---

## 9. NPU Deployment Roadmap

```
1. TRAIN MODEL  -->  2. EXPORT ONNX/TFLITE  -->  3. INT8 QUANTIZATION  -->  4. EDGE RUNTIME (WebNN)  -->  5. NPU ACCELERATION
```
The architecture is decoupled via `ModelAdapter`:
- `PrototypeModelAdapter`: Local deterministic rule classifier (in-browser today).
- `FutureOnnxModelAdapter`: Ready for quantized ONNX / WebNN edge deployment targeting Qualcomm Snapdragon NPU, Apple Neural Engine, or Intel NPU silicon.

---

## 10. Privacy & Limitations

- **Privacy**: No telemetry, analytics trackers, or image uploads.
- **Limitations**: ISL is a natural language with multi-handed signs, facial expressions, and complex spatial syntax. SignSetu is currently an assistive prototype demonstrating hand landmark tracking and bilingual translation.

---

## 11. Project Directory Structure

```
SIGNSETU/
├── dataset/             # Organized directories for 14 gestures
├── docs/                # Architecture, model, offline, dataset, deployment specs
├── public/              # Logo SVG and static assets
├── src/
│   ├── app/             # App shell and root layout
│   ├── components/      # Modular UI components (Camera, Result, Voice, Pipeline, etc.)
│   ├── data/            # Gestures, translations, and demo landmark presets
│   ├── hooks/           # useCamera, useGestureRecognition, useSpeech, useLocalStorage
│   ├── ml/              # ModelAdapter, LandmarkProcessor, GestureClassifier, smoothing
│   ├── pages/           # Home, Translator, History, About, Settings
│   ├── services/        # TranslationService, SpeechService, StorageService, PerformanceService
│   ├── styles/          # Tailwind globals, typography, and color tokens
│   ├── test/            # Vitest unit test suite
│   ├── types/           # Strict TypeScript interfaces
│   ├── utils/           # Geometry, normalization, formatters
│   └── vision/          # CameraManager, HandDetector, landmarkRenderer
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

*SignSetu — Developed for accessible communication and college hackathon presentation.*
