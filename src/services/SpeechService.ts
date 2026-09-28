export interface SpeechResult {
  success: boolean;
  usedFallback: boolean;
  message?: string;
}

export class SpeechService {
  private static voices: SpeechSynthesisVoice[] = [];
  private static isInitialized = false;

  public static initialize(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const loadVoices = () => {
      SpeechService.voices = window.speechSynthesis.getVoices();
      SpeechService.isInitialized = true;
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  public static getVoices(): SpeechSynthesisVoice[] {
    if (!SpeechService.isInitialized && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      SpeechService.voices = window.speechSynthesis.getVoices();
    }
    return SpeechService.voices;
  }

  public static hasTamilVoice(): boolean {
    const voices = SpeechService.getVoices();
    return voices.some(v => v.lang.startsWith('ta') || v.name.toLowerCase().includes('tamil'));
  }

  /**
   * Speaks Tamil text or provides informative fallback if Tamil TTS voice is absent on OS
   */
  public static async speakTamil(tamilText: string, englishFallback?: string): Promise<SpeechResult> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { success: false, usedFallback: false, message: 'Web Speech API is not supported in this browser.' };
    }

    window.speechSynthesis.cancel();

    const voices = SpeechService.getVoices();
    // Look for voice with language tag starting with "ta" (e.g. ta-IN, ta-LK)
    const tamilVoice = voices.find(v => v.lang.startsWith('ta') || v.name.toLowerCase().includes('tamil'));

    if (tamilVoice) {
      const utterance = new SpeechSynthesisUtterance(tamilText);
      utterance.voice = tamilVoice;
      utterance.lang = tamilVoice.lang || 'ta-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return { success: true, usedFallback: false };
    } else {
      // Fallback behavior as required: notify and optionally speak English transliteration/fallback
      if (englishFallback) {
        const fallbackUtterance = new SpeechSynthesisUtterance(englishFallback);
        fallbackUtterance.lang = 'en-US';
        fallbackUtterance.rate = 0.95;
        window.speechSynthesis.speak(fallbackUtterance);
      }
      return {
        success: false,
        usedFallback: true,
        message: 'Tamil voice is unavailable on this device. English voice remains available.',
      };
    }
  }

  /**
   * Speaks English text
   */
  public static async speakEnglish(text: string): Promise<SpeechResult> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { success: false, usedFallback: false, message: 'Web Speech API is not supported in this browser.' };
    }

    window.speechSynthesis.cancel();

    const voices = SpeechService.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en')) || null;

    const utterance = new SpeechSynthesisUtterance(text);
    if (enVoice) {
      utterance.voice = enVoice;
    }
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
    return { success: true, usedFallback: false };
  }

  /**
   * Immediately stops any speech utterance
   */
  public static stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}
