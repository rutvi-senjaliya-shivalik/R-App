import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Language, getTranslation, getTranslations, isLanguageSupported } from '../utils/translation';
import PrefManager from '../utils/prefManager';
import { getDeviceLanguage } from '../utils/languageHelper';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string, params?: Record<string, string | number>) => string;
  translations: any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'app_language';
const DEFAULT_LANGUAGE: Language = 'en';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [updateKey, setUpdateKey] = useState(0); // Force re-render key

  // Load saved language preference on mount
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await PrefManager.getValue(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && isLanguageSupported(savedLanguage)) {
        setLanguageState(savedLanguage);
      } else {
        // Try to detect device language
        const deviceLanguage = getDeviceLanguage();
        if (deviceLanguage && isLanguageSupported(deviceLanguage)) {
          setLanguageState(deviceLanguage);
        }
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = useCallback(async (lang: Language) => {
    try {
      if (!isLanguageSupported(lang)) {
        console.warn(`Language ${lang} is not supported. Using default.`);
        lang = DEFAULT_LANGUAGE;
      }
      
      // Update language state - this triggers re-render in all subscribed components
      setLanguageState(lang);
      
      // Force update key to ensure all components re-render
      setUpdateKey(prev => prev + 1);
      
      // Save to storage
      await PrefManager.setValue(LANGUAGE_STORAGE_KEY, lang);
      
      console.log(`✅ Language changed to: ${lang} - All components will update`);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  }, []);

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>): string => {
      // This function is recreated when language changes, ensuring fresh translations
      return getTranslation(language, key, params);
    };
  }, [language, updateKey]);

  const translations = useMemo(() => {
    return getTranslations(language);
  }, [language, updateKey]);

  // Create new object reference on language change to trigger re-renders
  // Using useMemo ensures the context value changes when language changes
  // This ensures ALL components using useTranslation/useLanguage will re-render
  const value: LanguageContextType = useMemo(() => ({
    language,
    setLanguage,
    t,
    translations,
    isLoading,
  }), [language, setLanguage, t, translations, isLoading, updateKey]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to use language context
 * @returns Language context values
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * Hook to get translation function
 * @returns Translation function
 */
export const useTranslation = () => {
  const { t, language } = useLanguage();
  return { t, language };
};

