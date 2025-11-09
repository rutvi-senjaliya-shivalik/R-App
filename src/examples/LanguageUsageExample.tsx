/**
 * Example: How to use language management in your components
 * 
 * This file demonstrates different ways to use translations and change language
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation, useLanguage } from '../context/LanguageContext';
import { useLanguageChange } from '../hooks/useLanguageChange';
import { LanguageSelector } from '../components/common';
import { getAvailableLanguages } from '../utils/languageHelper';

// Example 1: Simple translation usage
export const SimpleTranslationExample = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('auth.login')}</Text>
      <Text>{t('auth.pleaseEnterValidPhoneNumber', { digits: 10 })}</Text>
    </View>
  );
};

// Example 2: Language change with button
export const LanguageChangeExample = () => {
  const { t, language } = useTranslation();
  const { changeLanguage } = useLanguageChange();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.language')}</Text>
      <Text>Current: {language}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('en')}
      >
        <Text>English</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('hi')}
      >
        <Text>हिंदी</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('gu')}
      >
        <Text>ગુજરાતી</Text>
      </TouchableOpacity>
    </View>
  );
};

// Example 3: Using LanguageSelector component
export const LanguageSelectorExample = () => {
  const [showSelector, setShowSelector] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowSelector(true)}
      >
        <Text>{t('settings.language')}</Text>
      </TouchableOpacity>
      
      <LanguageSelector
        visible={showSelector}
        onClose={() => setShowSelector(false)}
      />
    </View>
  );
};

// Example 4: Custom language selector with all languages
export const CustomLanguageSelector = () => {
  const { t, language: currentLanguage } = useTranslation();
  const { changeLanguage } = useLanguageChange();
  const languages = getAvailableLanguages();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.language')}</Text>
      
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageOption,
            currentLanguage === lang.code && styles.selectedOption,
          ]}
          onPress={() => changeLanguage(lang.code as any)}
        >
          <Text style={styles.languageText}>{lang.name}</Text>
          {currentLanguage === lang.code && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Example 5: Using in a login screen
export const LoginScreenExample = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.login')}</Text>
      <Text style={styles.subtitle}>
        {t('auth.enterMobileNumber')}
      </Text>
      {/* Your login form here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
  },
  languageText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 20,
    color: '#1976D2',
    fontWeight: 'bold',
  },
});

