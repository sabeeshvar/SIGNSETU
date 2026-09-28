import { useState, useEffect, useCallback } from 'react';
import { SpeechService } from '../services/SpeechService';

export function useSpeech() {
  const [hasTamilVoice, setHasTamilVoice] = useState(false);
  const [speechWarning, setSpeechWarning] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    SpeechService.initialize();
    setHasTamilVoice(SpeechService.hasTamilVoice());

    const checkVoices = () => {
      setHasTamilVoice(SpeechService.hasTamilVoice());
    };

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }
  }, []);

  const speakEnglish = useCallback(async (text: string) => {
    setIsSpeaking(true);
    setSpeechWarning(null);
    const result = await SpeechService.speakEnglish(text);
    setIsSpeaking(false);
    if (!result.success && result.message) {
      setSpeechWarning(result.message);
    }
  }, []);

  const speakTamil = useCallback(async (tamilText: string, englishFallback?: string) => {
    setIsSpeaking(true);
    setSpeechWarning(null);
    const result = await SpeechService.speakTamil(tamilText, englishFallback);
    setIsSpeaking(false);
    if (result.usedFallback && result.message) {
      setSpeechWarning(result.message);
    }
  }, []);

  const stopVoice = useCallback(() => {
    SpeechService.stop();
    setIsSpeaking(false);
  }, []);

  return {
    speakEnglish,
    speakTamil,
    stopVoice,
    hasTamilVoice,
    speechWarning,
    isSpeaking,
    clearWarning: () => setSpeechWarning(null),
  };
}
