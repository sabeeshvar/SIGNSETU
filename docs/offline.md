# SignSetu Offline Architecture & Privacy

## 1. Principles of Offline Operation

SignSetu is engineered specifically to operate autonomously without network connectivity after the initial application bundle and assets are loaded.

```
┌────────────────────────────────────────────────────────┐
│                   LOCAL CLIENT DEVICE                  │
│                                                        │
│  [ Camera Feed ] ──> [ WebGL / WASM Vision Pipeline ]  │
│                               │                        │
│                               ▼                        │
│                     [ Landmark Extractor ]             │
│                               │                        │
│                               ▼                        │
│                  [ Morphological Classifier ]          │
│                               │                        │
│                               ▼                        │
│                  [ In-Memory Tamil Lexicon ]           │
│                               │                        │
│                               ▼                        │
│                     [ On-Device Web Speech ]           │
└────────────────────────────────────────────────────────┘
```

---

## 2. Zero External Network Reliance

1. **No External Translation APIs**: SignSetu does not query Google Cloud Translate, Microsoft Translator, or AWS Translate. All Tamil vocabulary mappings, transliterations, and contextual examples reside in an internal TypeScript dictionary.
2. **No Cloud Computer Vision**: Camera frames are processed directly inside browser memory through HTML5 Canvas / WebGL contexts. No frames or biometric data are transmitted over HTTP/WebSocket.
3. **No Cloud LLM / Speech APIs**: Speech synthesis is executed locally via the W3C Web Speech API (`window.speechSynthesis`), utilizing local speech synthesis engines embedded into modern operating systems (Windows, Android, macOS, Linux).
4. **Persistent State**: Settings and history are stored within the browser's sandboxed `localStorage` and never synchronized with remote databases or telemetry trackers.

---

## 3. Privacy Statement

> **SignSetu Privacy Guarantee**: Camera frames are processed locally for recognition. SignSetu does not intentionally upload, stream, or store camera frames on a remote server.
