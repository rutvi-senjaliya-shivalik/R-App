import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import { setLanguageAction, loadLanguageAction } from '../store/actions/language/languageAction';
import { selectLanguage } from '../store/selectors/language';
import { Language } from '../utils/translation';
import PrefManager from '../utils/prefManager';
import { useEffect } from 'react';

const LANGUAGE_STORAGE_KEY = 'app_language';

/**
 * Hook to manage language changes with both Context and Redux
 * This hook synchronizes language state between Context API and Redux
 */
export const useLanguageChange = () => {
  const dispatch = useDispatch();
  const reduxLanguage = useSelector(selectLanguage);
  const { language: contextLanguage, setLanguage: setContextLanguage } = useLanguage();

  // Sync Redux and Context on mount
  useEffect(() => {
    if (reduxLanguage && reduxLanguage !== contextLanguage) {
      setContextLanguage(reduxLanguage);
    }
  }, [reduxLanguage]);

  /**
   * Change language in both Context and Redux
   * This will trigger a re-render of ALL components using translations
   * @param lang - The language code to set
   */
  const changeLanguage = async (lang: Language) => {
    try {
      console.log(`🔄 Changing language to: ${lang}`);
      
      // Update Context first - this triggers immediate re-render
      await setContextLanguage(lang);
      
      // Update Redux - syncs with Redux state
      dispatch(setLanguageAction(lang));
      
      // Save to storage - persists the preference
      await PrefManager.setValue(LANGUAGE_STORAGE_KEY, lang);
      
      console.log(`✅ Language changed to: ${lang} - All app components updated`);
    } catch (error) {
      console.error('❌ Error changing language:', error);
    }
  };

  /**
   * Load saved language preference
   */
  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await PrefManager.getValue(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi' || savedLanguage === 'gu')) {
        await changeLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  return {
    currentLanguage: contextLanguage || reduxLanguage,
    changeLanguage,
    loadSavedLanguage,
  };
};

