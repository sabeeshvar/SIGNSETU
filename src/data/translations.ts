export interface TranslationEntry {
  english: string;
  tamil: string;
  transliteration: string;
  contextSentenceEn: string;
  contextSentenceTa: string;
  category: string;
}

export const TRANSLATION_DICTIONARY: Record<string, TranslationEntry> = {
  HELLO: {
    english: 'HELLO',
    tamil: 'வணக்கம்',
    transliteration: 'Vanakkam',
    contextSentenceEn: 'Hello, welcome to SignSetu.',
    contextSentenceTa: 'வணக்கம், சைன்சேதுவிற்கு நல்வரவு.',
    category: 'communication',
  },
  'THANK YOU': {
    english: 'THANK YOU',
    tamil: 'நன்றி',
    transliteration: 'Nandri',
    contextSentenceEn: 'Thank you very much for your kind support.',
    contextSentenceTa: 'உங்கள் அன்பான ஆதரவிற்கு மிக்க நன்றி.',
    category: 'social',
  },
  YES: {
    english: 'YES',
    tamil: 'ஆம்',
    transliteration: 'Aam',
    contextSentenceEn: 'Yes, I agree with this.',
    contextSentenceTa: 'ஆம், நான் இதை ஏற்றுக்கொள்கிறேன்.',
    category: 'communication',
  },
  NO: {
    english: 'NO',
    tamil: 'இல்லை',
    transliteration: 'Illai',
    contextSentenceEn: 'No, that is not required.',
    contextSentenceTa: 'இல்லை, அது தேவையில்லை.',
    category: 'communication',
  },
  HELP: {
    english: 'HELP',
    tamil: 'உதவி',
    transliteration: 'Uthavi',
    contextSentenceEn: 'Please help me immediately.',
    contextSentenceTa: 'தயவுசெய்து எனக்கு உடனே உதவி செய்யுங்கள்.',
    category: 'emergency',
  },
  STOP: {
    english: 'STOP',
    tamil: 'நிறுத்து',
    transliteration: 'Nirutthu',
    contextSentenceEn: 'Please stop right here.',
    contextSentenceTa: 'தயவுசெய்து இங்கேயே நிறுத்துங்கள்.',
    category: 'emergency',
  },
  PLEASE: {
    english: 'PLEASE',
    tamil: 'தயவு செய்து',
    transliteration: 'Thayavu Seithu',
    contextSentenceEn: 'Please listen to me.',
    contextSentenceTa: 'தயவு செய்து நான் சொல்வதைக் கேளுங்கள்.',
    category: 'social',
  },
  GOOD: {
    english: 'GOOD',
    tamil: 'நல்லது',
    transliteration: 'Nallathu',
    contextSentenceEn: 'This is very good.',
    contextSentenceTa: 'இது மிகவும் நல்லது.',
    category: 'communication',
  },
  BAD: {
    english: 'BAD',
    tamil: 'மோசம்',
    transliteration: 'Mosam',
    contextSentenceEn: 'The situation is not good.',
    contextSentenceTa: 'நிலைமை மிகவும் மோசமாக உள்ளது.',
    category: 'communication',
  },
  WATER: {
    english: 'WATER',
    tamil: 'தண்ணீர்',
    transliteration: 'Thanneer',
    contextSentenceEn: 'I need drinking water.',
    contextSentenceTa: 'எனக்குக் குடிக்கத் தண்ணீர் வேண்டும்.',
    category: 'necessity',
  },
  FOOD: {
    english: 'FOOD',
    tamil: 'உணவு',
    transliteration: 'Unavu',
    contextSentenceEn: 'I am hungry, I need food.',
    contextSentenceTa: 'எனக்குப் பசிக்கிறது, உணவு தேவை.',
    category: 'necessity',
  },
  HOME: {
    english: 'HOME',
    tamil: 'வீடு',
    transliteration: 'Veedu',
    contextSentenceEn: 'I want to return home.',
    contextSentenceTa: 'நான் வீட்டிற்குச் செல்ல விரும்புகிறேன்.',
    category: 'location',
  },
  SCHOOL: {
    english: 'SCHOOL',
    tamil: 'பள்ளி',
    transliteration: 'Palli',
    contextSentenceEn: 'Going to school for study.',
    contextSentenceTa: 'படிப்பதற்காகப் பள்ளிக்குச் செல்கிறேன்.',
    category: 'location',
  },
  HOSPITAL: {
    english: 'HOSPITAL',
    tamil: 'மருத்துவமனை',
    transliteration: 'Maruthuvamanai',
    contextSentenceEn: 'Please take me to the hospital.',
    contextSentenceTa: 'என்னை மருத்துவமனைக்கு அழைத்துச் செல்லுங்கள்.',
    category: 'location',
  },
};
