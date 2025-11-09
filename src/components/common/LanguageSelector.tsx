import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { useLanguageChange } from '../../hooks/useLanguageChange';
import { useTranslation } from '../../context/LanguageContext';
import { getAvailableLanguages } from '../../utils/languageHelper';
import { COLORS } from '../../constants';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onClose }) => {
  const { changeLanguage } = useLanguageChange();
  const { t, language: currentLanguage } = useTranslation();
  const availableLanguages = getAvailableLanguages();

  const handleLanguageSelect = async (langCode: string) => {
    await changeLanguage(langCode as any);
    onClose();
  };

  const renderLanguageItem = ({ item }: { item: { code: string; name: string } }) => {
    const isSelected = item.code === currentLanguage;
    
    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          isSelected && styles.selectedLanguageItem,
        ]}
        onPress={() => handleLanguageSelect(item.code)}
      >
        <Text
          style={[
            styles.languageName,
            isSelected && styles.selectedLanguageName,
          ]}
        >
          {item.name}
        </Text>
        {isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('settings.language')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={availableLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.code}
            style={styles.list}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.BLACK,
  },
  list: {
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  selectedLanguageItem: {
    backgroundColor: COLORS.LIGHT_BLUE || '#E3F2FD',
  },
  languageName: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  selectedLanguageName: {
    fontWeight: 'bold',
    color: COLORS.DARK_BLUE || '#1976D2',
  },
  checkmark: {
    fontSize: 20,
    color: COLORS.DARK_BLUE || '#1976D2',
    fontWeight: 'bold',
  },
});

export default LanguageSelector;

