import { describe, it, expect, beforeEach } from 'vitest';
import { TranslationService } from '../services/TranslationService';
import { getConfidenceLevel, getConfidenceAdvice } from '../ml/confidence';
import { TemporalSmoother } from '../ml/smoothing';
import { SUPPORTED_GESTURES } from '../data/gestures';
import { DEMO_LANDMARK_PRESETS } from '../data/demoGestures';
import { PrototypeModelAdapter, FutureOnnxModelAdapter } from '../ml/ModelAdapter';
import { StorageService, DEFAULT_SETTINGS } from '../services/StorageService';

describe('SignSetu Unit Test Suite', () => {

  describe('TranslationService', () => {
    it('translates supported English gestures to Tamil Unicode accurately', () => {
      expect(TranslationService.translateEnglishToTamil('HELLO')).toBe('வணக்கம்');
      expect(TranslationService.translateEnglishToTamil('THANK YOU')).toBe('நன்றி');
      expect(TranslationService.translateEnglishToTamil('YES')).toBe('ஆம்');
      expect(TranslationService.translateEnglishToTamil('NO')).toBe('இல்லை');
      expect(TranslationService.translateEnglishToTamil('HELP')).toBe('உதவி');
      expect(TranslationService.translateEnglishToTamil('WATER')).toBe('தண்ணீர்');
    });

    it('returns translation entry with transliteration and sentences', () => {
      const entry = TranslationService.getTranslationEntry('HELLO');
      expect(entry).not.toBeNull();
      expect(entry?.transliteration).toBe('Vanakkam');
      expect(entry?.category).toBe('communication');
    });

    it('returns supported language pairs', () => {
      const langs = TranslationService.getSupportedLanguages();
      expect(langs.some(l => l.code === 'ta')).toBe(true);
      expect(langs.some(l => l.code === 'en')).toBe(true);
    });
  });

  describe('Confidence Logic', () => {
    it('categorizes confidence scores correctly', () => {
      expect(getConfidenceLevel(95)).toBe('high');
      expect(getConfidenceLevel(85)).toBe('high');
      expect(getConfidenceLevel(80)).toBe('confirming');
      expect(getConfidenceLevel(60)).toBe('confirming');
      expect(getConfidenceLevel(55)).toBe('unknown');
      expect(getConfidenceLevel(0)).toBe('unknown');
    });

    it('handles normalized 0..1 scale properly', () => {
      expect(getConfidenceLevel(0.92)).toBe('high');
      expect(getConfidenceLevel(0.70)).toBe('confirming');
      expect(getConfidenceLevel(0.40)).toBe('unknown');
    });

    it('generates appropriate guidance advice', () => {
      expect(getConfidenceAdvice('high')).toContain('Stable recognition');
      expect(getConfidenceAdvice('confirming')).toContain('Hold the gesture steady');
      expect(getConfidenceAdvice('unknown')).toContain('No recognizable sign');
    });
  });

  describe('Temporal Smoothing Logic', () => {
    let smoother: TemporalSmoother;

    beforeEach(() => {
      smoother = new TemporalSmoother(6, 4);
    });

    it('does not stabilize an isolated single-frame prediction', () => {
      const res = smoother.addPrediction('HELLO', 0.9);
      expect(res.stableLabel).toBeNull();
    });

    it('stabilizes after repeated consecutive frames meet threshold', () => {
      smoother.addPrediction('HELLO', 0.9);
      smoother.addPrediction('HELLO', 0.92);
      smoother.addPrediction('HELLO', 0.88);
      const res4 = smoother.addPrediction('HELLO', 0.95);

      expect(res4.stableLabel).toBe('HELLO');
      expect(res4.stableConfidence).toBeGreaterThan(0.85);
    });

    it('resets buffer history cleanly', () => {
      smoother.addPrediction('HELLO', 0.9);
      smoother.addPrediction('HELLO', 0.9);
      smoother.reset();
      expect(smoother.getLastStable()).toBeNull();
    });
  });

  describe('Gesture Data Consistency', () => {
    it('contains all 14 mandatory vocabulary items', () => {
      const ids = SUPPORTED_GESTURES.map(g => g.id);
      const required = [
        'hello', 'thank_you', 'yes', 'no', 'help', 'stop',
        'please', 'good', 'bad', 'water', 'food', 'home',
        'school', 'hospital'
      ];

      required.forEach(req => {
        expect(ids).toContain(req);
      });
      expect(SUPPORTED_GESTURES.length).toBe(14);
    });

    it('ensures every gesture has Tamil translation and valid rules', () => {
      SUPPORTED_GESTURES.forEach(g => {
        expect(g.english.length).toBeGreaterThan(0);
        expect(g.tamil.length).toBeGreaterThan(0);
        expect(g.rule).toBeDefined();
        expect(g.hint.length).toBeGreaterThan(0);
      });
    });

    it('ensures all demo landmark presets contain exactly 21 3D points', () => {
      Object.entries(DEMO_LANDMARK_PRESETS).forEach(([_gestureId, landmarks]) => {
        expect(landmarks.length).toBe(21);
        landmarks.forEach(pt => {
          expect(typeof pt.x).toBe('number');
          expect(typeof pt.y).toBe('number');
          expect(typeof pt.z).toBe('number');
        });
      });
    });
  });

  describe('Model Adapters', () => {
    it('initializes and runs PrototypeModelAdapter locally', async () => {
      const adapter = new PrototypeModelAdapter();
      await adapter.initialize();
      expect(adapter.isNpuReady).toBe(true);

      const prediction = await adapter.predict(new Array(63).fill(0.1));
      expect(prediction.confidence).toBeGreaterThan(0);
      adapter.dispose();
    });

    it('instantiates FutureOnnxModelAdapter with edge NPU flag', () => {
      const onnxAdapter = new FutureOnnxModelAdapter();
      expect(onnxAdapter.isNpuReady).toBe(true);
      expect(onnxAdapter.getModelPath()).toBe('/models/signsetu_isl_v1.onnx');
    });
  });

  describe('Storage Service Defaults', () => {
    it('provides sensible default settings and retrieves them', () => {
      expect(DEFAULT_SETTINGS.primaryLanguage).toBe('ta');
      expect(DEFAULT_SETTINGS.confidenceThreshold).toBe(60);
      expect(DEFAULT_SETTINGS.smoothingWindow).toBe(8);
      expect(DEFAULT_SETTINGS.showLandmarks).toBe(true);

      const retrieved = StorageService.getSettings();
      expect(retrieved.primaryLanguage).toBeDefined();
    });
  });

});
