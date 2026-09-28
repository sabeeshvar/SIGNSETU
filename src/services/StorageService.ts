import type { AppSettings } from '../types/system';
import type { RecognitionHistoryItem } from '../types/recognition';

const SETTINGS_KEY = 'signsetu_settings';
const HISTORY_KEY = 'signsetu_recognition_history';
const ONBOARDING_KEY = 'signsetu_onboarding_completed';

export const DEFAULT_SETTINGS: AppSettings = {
  selectedCameraId: '',
  primaryLanguage: 'ta',
  autoVoiceEnabled: false,
  confidenceThreshold: 60,
  isDemoMode: false,
  showLandmarks: true,
  showTechDetails: true,
  darkMode: false,
  smoothingWindow: 8,
  minStableCount: 4,
};

export class StorageService {
  public static getSettings(): AppSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // LocalStorage access failure fallback
    }
    return DEFAULT_SETTINGS;
  }

  public static saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }

  public static getHistory(): RecognitionHistoryItem[] {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  }

  public static addHistoryItem(item: Omit<RecognitionHistoryItem, 'id'>): RecognitionHistoryItem[] {
    try {
      const current = StorageService.getHistory();
      const newItem: RecognitionHistoryItem = {
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      };

      // Prepend and cap at 20 items (as required in Section 22)
      const updated = [newItem, ...current].slice(0, 20);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  }

  public static clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // ignore
    }
  }

  public static isOnboardingCompleted(): boolean {
    try {
      return localStorage.getItem(ONBOARDING_KEY) === 'true';
    } catch {
      return false;
    }
  }

  public static setOnboardingCompleted(completed = true): void {
    try {
      localStorage.setItem(ONBOARDING_KEY, completed ? 'true' : 'false');
    } catch {
      // ignore
    }
  }
}
