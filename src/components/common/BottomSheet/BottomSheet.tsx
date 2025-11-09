import React, { ReactNode } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Text } from 'react-native';
import { BottomSheetStyles } from './styles';
import CustomButton from '../customButton';

interface ButtonConfig {
  text: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface BottomSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  positiveButton?: ButtonConfig;
  negativeButton?: ButtonConfig;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  title,
  onClose,
  children,
  positiveButton,
  negativeButton,
}) => {
  const hasButtons = positiveButton || negativeButton;
  const hasBothButtons = positiveButton && negativeButton;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={BottomSheetStyles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={BottomSheetStyles.sheetContainer}>
            <View style={BottomSheetStyles.handleBar} />
            <ScrollView
              style={BottomSheetStyles.sheetContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={BottomSheetStyles.sheetTitle}>{title}</Text>
              {children}
              {hasButtons && (
                <View style={hasBothButtons ? BottomSheetStyles.buttonRow : BottomSheetStyles.singleButtonRow}>
                  {negativeButton && (
                    <View style={hasBothButtons ? BottomSheetStyles.button : BottomSheetStyles.fullButton}>
                      <CustomButton
                        title={negativeButton.text}
                        onPress={negativeButton.onPress}
                        disabled={negativeButton.disabled || negativeButton.loading}
                        loading={negativeButton.loading}
                        style={BottomSheetStyles.negativeButton}
                        textStyle={BottomSheetStyles.negativeButtonText}
                      />
                    </View>
                  )}
                  {positiveButton && (
                    <View style={hasBothButtons ? BottomSheetStyles.button : BottomSheetStyles.fullButton}>
                      <CustomButton
                        title={positiveButton.text}
                        onPress={positiveButton.onPress}
                        loading={positiveButton.loading}
                        disabled={positiveButton.disabled}
                      />
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomSheet;

