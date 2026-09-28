import { TRANSLATION_DICTIONARY } from '../data/translations';
import type { TranslationEntry } from '../data/translations';

export class TranslationService {
  /**
   * Translates English gesture label to Tamil Unicode
   */
  public static translateEnglishToTamil(english: string): string {
    if (!english) return '';
    const key = english.trim().toUpperCase();
    const entry = TRANSLATION_DICTIONARY[key];
    return entry ? entry.tamil : english;
  }

  /**
   * Retrieves full translation entry with transliteration and sentences
   */
  public static getTranslationEntry(english: string): TranslationEntry | null {
    if (!english) return null;
    const key = english.trim().toUpperCase();
    return TRANSLATION_DICTIONARY[key] || null;
  }

  /**
   * Returns supported translation language pairs
   */
  public static getSupportedLanguages(): { code: string; label: string; nativeLabel: string }[] {
    return [
      { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
      { code: 'en', label: 'English', nativeLabel: 'English' },
    ];
  }
}
