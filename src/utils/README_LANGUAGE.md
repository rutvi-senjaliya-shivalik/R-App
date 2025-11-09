# Language Management Guide

This guide explains how to use the language management system in the app.

## Overview

The app supports three languages:
- **English (en)** - Default
- **Hindi (hi)** - हिंदी
- **Gujarati (gu)** - ગુજરાતી

## Usage Methods

### Method 1: Using Context API (Recommended)

This is the simplest way to use translations in your components.

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '../context/LanguageContext';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('auth.login')}</Text>
      <Text>{t('auth.pleaseEnterValidPhoneNumber', { digits: 10 })}</Text>
    </View>
  );
};
```

### Method 2: Using useLanguage Hook

Get full language context including change function:

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const MyComponent = () => {
  const { t, language, setLanguage } = useLanguage();

  const changeToHindi = async () => {
    await setLanguage('hi');
  };

  return (
    <View>
      <Text>{t('auth.login')}</Text>
      <Text>Current Language: {language}</Text>
      <Button title="Change to Hindi" onPress={changeToHindi} />
    </View>
  );
};
```

### Method 3: Using useLanguageChange Hook (Redux + Context)

This hook synchronizes both Context and Redux:

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLanguageChange } from '../hooks/useLanguageChange';
import { useTranslation } from '../context/LanguageContext';

const MyComponent = () => {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguageChange();

  const handleLanguageChange = async (lang: 'en' | 'hi' | 'gu') => {
    await changeLanguage(lang);
  };

  return (
    <View>
      <Text>{t('auth.login')}</Text>
      <Button title="English" onPress={() => handleLanguageChange('en')} />
      <Button title="Hindi" onPress={() => handleLanguageChange('hi')} />
      <Button title="Gujarati" onPress={() => handleLanguageChange('gu')} />
    </View>
  );
};
```

### Method 4: Standalone Translation Function

For use outside React components:

```tsx
import { translate, getSavedLanguage } from '../utils/languageHelper';

// Get translation for a specific language
const text = translate('en', 'auth.login');

// Get saved language and translate
const savedLang = await getSavedLanguage();
const translatedText = translate(savedLang, 'auth.login');
```

## Changing Language

### Using Language Selector Component

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import LanguageSelector from '../components/common/LanguageSelector';

const SettingsScreen = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  return (
    <View>
      <Button 
        title="Change Language" 
        onPress={() => setShowLanguageSelector(true)} 
      />
      <LanguageSelector 
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </View>
  );
};
```

### Programmatically Change Language

```tsx
import { useLanguageChange } from '../hooks/useLanguageChange';

const MyComponent = () => {
  const { changeLanguage } = useLanguageChange();

  const switchToHindi = async () => {
    await changeLanguage('hi');
  };

  // Language is automatically saved and persisted
};
```

## Translation Key Structure

Translation keys use dot notation to access nested objects:

```json
{
  "auth": {
    "login": "Login",
    "verifyOtp": "VERIFY OTP"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel"
  }
}
```

Usage:
- `t('auth.login')` → "Login"
- `t('common.save')` → "Save"

## Parameters in Translations

Some translations support parameters:

```json
{
  "auth": {
    "pleaseEnterValidPhoneNumber": "Please enter a valid phone number with {digits} digits."
  }
}
```

Usage:
```tsx
t('auth.pleaseEnterValidPhoneNumber', { digits: 10 })
// Output: "Please enter a valid phone number with 10 digits."
```

## Available Functions

### Context API
- `useTranslation()` - Get translation function
- `useLanguage()` - Get full language context

### Hooks
- `useLanguageChange()` - Change language with Redux sync

### Utilities
- `translate(language, key, params?)` - Standalone translation
- `getSavedLanguage()` - Get saved language preference
- `saveLanguage(language)` - Save language preference
- `getAvailableLanguages()` - Get list of available languages
- `isValidLanguage(lang)` - Check if language code is valid

## Language Persistence

The selected language is automatically saved to AsyncStorage and persists across app restarts. The language preference is stored with the key `app_language`.

## Example: Complete Language Settings Screen

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../context/LanguageContext';
import { useLanguageChange } from '../hooks/useLanguageChange';
import { getAvailableLanguages } from '../utils/languageHelper';

const LanguageSettingsScreen = () => {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguageChange();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
});

export default LanguageSettingsScreen;
```

## Notes

- The language preference is automatically loaded when the app starts
- All translations fallback to English if a key is not found
- The language state is synchronized between Context API and Redux
- Language changes are immediately reflected across all components using the translation hooks

