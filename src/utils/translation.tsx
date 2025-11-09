import enTranslations from '../translations/en.json';
import hiTranslations from '../translations/hi.json';
import guTranslations from '../translations/gu.json';

export type Language = 'en' | 'hi' | 'gu';

export const translations: Record<Language, any> = {
  en: enTranslations,
  hi: hiTranslations,
  gu: guTranslations,
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  gu: 'ગુજરાતી',
};

/**
 * Get translation for a given key
 * @param language - The language code (en, hi, gu)
 * @param key - The translation key (e.g., 'auth.login')
 * @param params - Optional parameters to replace in the translation
 * @returns The translated string
 */
export const getTranslation = (
  language: Language,
  key: string,
  params?: Record<string, string | number>,
): string => {
  try {
    const keys = key.split('.');
    let value: any = translations[language] || translations.en;

    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }

    // If value is a string, replace params if provided
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return typeof value === 'string' ? value : key;
  } catch (error) {
    console.error('Translation error:', error);
    return key;
  }
};

/**
 * Get all translations for a given language
 * @param language - The language code
 * @returns The translations object
 */
export const getTranslations = (language: Language): any => {
  return translations[language] || translations.en;
};

/**
 * Check if a language is supported
 * @param language - The language code to check
 * @returns True if language is supported
 */
export const isLanguageSupported = (language: string): language is Language => {
  return language in translations;
};

