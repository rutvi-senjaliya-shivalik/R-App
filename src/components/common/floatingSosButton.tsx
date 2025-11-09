import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import sosStyles from '../../screen/sos/sosStyles';

interface FloatingSosButtonProps {
  onPress?: () => void;
}

const FloatingSosButton: React.FC<FloatingSosButtonProps> = ({ onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to SOS Emergency screen
      navigation.navigate('SosEmergency' as never);
    }
  };

  return (
    <TouchableOpacity
      style={sosStyles.floatingSosButton}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={sosStyles.floatingSosIcon}>🆘</Text>
      <Text style={sosStyles.floatingSosText}>SOS</Text>
    </TouchableOpacity>
  );
};

export default FloatingSosButton;
