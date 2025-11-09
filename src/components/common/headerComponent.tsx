import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Image } from 'react-native';
import { IMAGES, COLORS } from '../../constants';
import { HeaderComponentProps } from '../../types/component';
import { HeaderComponentStyles } from './styles';
import { useTranslation } from '../../context/LanguageContext';
import { useLanguageChange } from '../../hooks/useLanguageChange';
import { getAvailableLanguages } from '../../utils/languageHelper';

const HeaderComponent = ({ Title, onPress, showLanguageSelector = true, titleStyle, rightAction }: HeaderComponentProps) => {
  const { t, language: currentLanguage } = useTranslation();
  const { changeLanguage } = useLanguageChange();
  const languages = getAvailableLanguages();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleLanguageSelect = async (langCode: string) => {
    try {
      await changeLanguage(langCode as any);
      setShowLanguageModal(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Get current language name
  const currentLangName = languages.find(lang => lang.code === currentLanguage)?.name || 'EN';

  return (
    <View style={HeaderComponentStyles.container}>
      <View style={HeaderComponentStyles.leftSection}>
        <TouchableOpacity
          style={HeaderComponentStyles.backBtn}
          onPress={onPress}
        >
          <Image source={IMAGES.BACK} style={HeaderComponentStyles.backImg} />
        </TouchableOpacity>
      </View>
      <View style={HeaderComponentStyles.centerSection}>
        <Text style={[HeaderComponentStyles.title, titleStyle]}>{Title}</Text>
      </View>
      {(showLanguageSelector || rightAction) && (
        <View style={HeaderComponentStyles.rightSection}>
          {rightAction}
          {showLanguageSelector && (
            <>
              <TouchableOpacity 
                style={HeaderComponentStyles.languageButton}
                onPress={() => setShowLanguageModal(true)}
                activeOpacity={0.7}
              >
                <Text style={HeaderComponentStyles.languageText}>{currentLangName}</Text>
                <Image source={IMAGES.DROPDOWN} style={HeaderComponentStyles.dropdownIcon} />
              </TouchableOpacity>
              
              <Modal
            visible={showLanguageModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowLanguageModal(false)}
          >
            <TouchableOpacity
              style={HeaderComponentStyles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowLanguageModal(false)}
            >
              <View 
                style={HeaderComponentStyles.modalContent}
                onStartShouldSetResponder={() => true}
              >
                <View style={HeaderComponentStyles.modalHeader}>
                  <Text style={HeaderComponentStyles.modalTitle}>{t('settings.language')}</Text>
                  <TouchableOpacity
                    onPress={() => setShowLanguageModal(false)}
                    style={HeaderComponentStyles.closeButton}
                  >
                    <Text style={HeaderComponentStyles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={languages}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => {
                    const isSelected = item.code === currentLanguage;
                    return (
                      <TouchableOpacity
                        style={[
                          HeaderComponentStyles.modalOption,
                          isSelected && HeaderComponentStyles.modalOptionSelected,
                        ]}
                        onPress={() => handleLanguageSelect(item.code)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            HeaderComponentStyles.modalOptionText,
                            isSelected && HeaderComponentStyles.modalOptionTextSelected,
                          ]}
                        >
                          {item.name}
                        </Text>
                        {isSelected && (
                          <Text style={HeaderComponentStyles.modalCheckmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default HeaderComponent;
