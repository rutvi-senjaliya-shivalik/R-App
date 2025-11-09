import { Platform, NativeModules } from 'react-native';
import { Language, getTranslation, languageNames } from './translation';
import PrefManager from './prefManager';

const LANGUAGE_STORAGE_KEY = 'app_language';
const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Get saved language from storage
 */
export const getSavedLanguage = async (): Promise<Language> => {
  try {
    const savedLanguage = await PrefManager.getValue(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'en' || savedLanguage === 'hi' || savedLanguage === 'gu') {
      return savedLanguage as Language;
    }
  } catch (error) {
    console.error('Error getting saved language:', error);
  }
  return DEFAULT_LANGUAGE;
};

/**
 * Save language preference to storage
 */
export const saveLanguage = async (language: Language): Promise<void> => {
  try {
    await PrefManager.setValue(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

/**
 * Get available languages
 */
export const getAvailableLanguages = (): Array<{ code: Language; name: string }> => {
  return [
    { code: 'en', name: languageNames.en },
    { code: 'hi', name: languageNames.hi },
    { code: 'gu', name: languageNames.gu },
  ];
};

/**
 * Translate a key (standalone function, doesn't require hooks)
 */
export const translate = (
  language: Language,
  key: string,
  params?: Record<string, string | number>,
): string => {
  return getTranslation(language, key, params);
};

/**
 * Check if language code is valid
 */
export const isValidLanguage = (lang: string): lang is Language => {
  return lang === 'en' || lang === 'hi' || lang === 'gu';
};

/**
 * Get device language
 * Returns the device's language code if supported, otherwise returns null
 */
export const getDeviceLanguage = (): Language | null => {
  try {
    let deviceLocale: string = '';
    
    // Try to get locale using Intl API (most reliable cross-platform)
    if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      try {
        const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
        deviceLocale = resolvedOptions.locale || '';
      } catch (e) {
        // Intl not available or error
      }
    }
    
    // Fallback: Try NativeModules for platform-specific locale
    if (!deviceLocale) {
      try {
        if (Platform.OS === 'ios') {
          // iOS: Try to get locale from NativeModules
          const SettingsManager = NativeModules.SettingsManager;
          if (SettingsManager?.settings) {
            deviceLocale = SettingsManager.settings.AppleLocale ||
                          SettingsManager.settings.AppleLanguages?.[0] ||
                          '';
          }
        } else if (Platform.OS === 'android') {
          // Android: Try to get locale from NativeModules
          const I18nManager = NativeModules.I18nManager;
          if (I18nManager) {
            deviceLocale = I18nManager.localeIdentifier ||
                          I18nManager.locale ||
                          '';
          }
        }
      } catch (e) {
        // NativeModules not available
      }
    }
    
    // If still no locale, return null (will use default)
    if (!deviceLocale) {
      return null;
    }
    
    // Extract language code (first 2 characters before hyphen)
    const languageCode = deviceLocale.split('-')[0].split('_')[0].toLowerCase();
    
    // Map to supported languages
    if (languageCode === 'hi' || languageCode === 'hin') {
      return 'hi';
    } else if (languageCode === 'gu' || languageCode === 'guj') {
      return 'gu';
    } else if (languageCode === 'en') {
      return 'en';
    }
    
    // Return null if language is not supported (will use default)
    return null;
  } catch (error) {
    console.error('Error getting device language:', error);
    return null;
  }
};

