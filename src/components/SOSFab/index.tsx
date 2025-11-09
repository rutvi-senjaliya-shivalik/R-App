/**
 * SOS Floating Action Button Component
 * 
 * A floating action button that expands to reveal emergency options.
 * Features:
 * - Animated expansion (vertical upward with stagger)
 * - Three emergency options: Medical, Theft (disabled), Fire
 * - Sound alarm playback for Medical and Fire
 * - Modern animations using React Native's Animated API
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Alert,
  Image,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  initializeSounds,
  playMedicalAlarm,
  playFireAlarm,
  stopAllAlarms,
  releaseSounds,
} from '../../utils/soundPlayer';
import { createSOSAction } from '../../store/actions/sos/sosAction';
import Images from '../../constants/images';
import { defaultIcon } from '../../assets/icons';
import SOSFabStyles from './styles';

/**
 * Emergency option type definition
 */
interface EmergencyOption {
  id: string;
  label: string;
  icon: any;
  backgroundColor: string;
  onPress: () => void;
  disabled?: boolean;
}

const SOSFab: React.FC = () => {
  // Redux dispatch
  const dispatch = useDispatch() as any;
  
  // State management
  const [isExpanded, setIsExpanded] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);

  // Animation values
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const medicalAnim = useRef(new Animated.Value(0)).current;
  const theftAnim = useRef(new Animated.Value(0)).current;
  const fireAnim = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  /**
   * Initialize sounds on component mount
   */
  useEffect(() => {
    initializeSounds();

    // Cleanup on unmount
    return () => {
      stopAllAlarms();
      releaseSounds();
    };
  }, []);

  /**
   * Toggle FAB expansion/collapse
   */
  const toggleExpand = () => {
    // If alarm is active, show stop confirmation (regardless of expansion state)
    if (alarmActive) {
      // Collapse options first if expanded
      if (isExpanded) {
        animateCollapse();
      }
      
      Alert.alert(
        'Stop Alarm',
        'Do you want to stop the emergency alarm?',
        [
          {
            text: 'Continue Alarm',
            style: 'cancel',
          },
          {
            text: 'Stop Alarm',
            style: 'destructive',
            onPress: () => {
              stopAllAlarms();
              setAlarmActive(false);
            },
          },
        ]
      );
      return;
    }

    // Normal toggle behavior when no alarm is active
    if (isExpanded) {
      animateCollapse();
    } else {
      animateExpand();
    }
  };

  /**
   * Animate expansion with stagger effect
   */
  const animateExpand = () => {
    setIsExpanded(true);

    // Parallel animations with stagger timing
    Animated.parallel([
      // Rotate main FAB
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      // Backdrop fade in
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      // Stagger options (Medical first)
      Animated.timing(medicalAnim, {
        toValue: 1,
        duration: 250,
        delay: 0,
        useNativeDriver: true,
      }),
      // Theft second (50ms delay)
      Animated.timing(theftAnim, {
        toValue: 1,
        duration: 250,
        delay: 50,
        useNativeDriver: true,
      }),
      // Fire third (100ms delay)
      Animated.timing(fireAnim, {
        toValue: 1,
        duration: 250,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * Animate collapse
   */
  const animateCollapse = () => {
    Animated.parallel([
      // Rotate main FAB back
      Animated.timing(rotationAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      // Backdrop fade out
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      // Collapse all options simultaneously
      Animated.timing(medicalAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(theftAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fireAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsExpanded(false);
    });
  };

  /**
   * Handle Medical emergency
   */
  const handleMedical = () => {
    Alert.alert(
      'Medical Emergency',
      'Activate medical emergency alarm?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Activate',
          style: 'destructive',
          onPress: async () => {
            try {
              // Call API to create SOS alert
              await dispatch(createSOSAction('Medical Emergency'));
              console.log('Medical SOS alert sent to server');
              
              // Play alarm sound
              const success = playMedicalAlarm();
              if (success) {
                setAlarmActive(true);
                // Collapse options immediately when alarm is activated
                animateCollapse();
                Alert.alert(
                  'Medical Alarm Active',
                  'Emergency alert sent! Emergency services should be contacted. Tap the SOS button to stop the alarm.',
                  [{ text: 'OK' }]
                );
              } else {
                Alert.alert(
                  'Medical Alert Sent',
                  'Emergency alert sent to server. Unable to play alarm sound.',
                  [{ text: 'OK' }]
                );
                animateCollapse();
              }
            } catch (error) {
              console.error('Failed to send medical SOS alert:', error);
              // Still play alarm even if API fails
              const success = playMedicalAlarm();
              if (success) {
                setAlarmActive(true);
                animateCollapse();
              } else {
                animateCollapse();
              }
              Alert.alert(
                'Warning',
                'Alarm activated but failed to send alert to server. Please contact emergency services.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  /**
   * Handle Fire emergency
   */
  const handleFire = () => {
    Alert.alert(
      'Fire Emergency',
      'Activate fire emergency alarm?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Activate',
          style: 'destructive',
          onPress: async () => {
            try {
              // Call API to create SOS alert
              await dispatch(createSOSAction('Fire Emergency'));
              console.log('Fire SOS alert sent to server');
              
              // Play alarm sound
              const success = playFireAlarm();
              if (success) {
                setAlarmActive(true);
                // Collapse options immediately when alarm is activated
                animateCollapse();
                Alert.alert(
                  'Fire Alarm Active',
                  'Emergency alert sent! Emergency services should be contacted. Tap the SOS button to stop the alarm.',
                  [{ text: 'OK' }]
                );
              } else {
                Alert.alert(
                  'Fire Alert Sent',
                  'Emergency alert sent to server. Unable to play alarm sound.',
                  [{ text: 'OK' }]
                );
                animateCollapse();
              }
            } catch (error) {
              console.error('Failed to send fire SOS alert:', error);
              // Still play alarm even if API fails
              const success = playFireAlarm();
              if (success) {
                setAlarmActive(true);
                animateCollapse();
              } else {
                animateCollapse();
              }
              Alert.alert(
                'Warning',
                'Alarm activated but failed to send alert to server. Please contact emergency services.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  /**
   * Handle Theft emergency
   */
  const handleTheft = () => {
    Alert.alert(
      'Theft/Security Alert',
      'Report theft or security breach?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Report',
          style: 'destructive',
          onPress: async () => {
            try {
              // Call API to create SOS alert
              await dispatch(createSOSAction('Theft Emergency'));
              console.log('Theft SOS alert sent to server');
              
              // Show confirmation
              Alert.alert(
                'Alert Sent',
                'Security alert has been sent to authorities. Help is on the way.',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Failed to send theft SOS alert:', error);
              Alert.alert(
                'Error',
                'Failed to send security alert to server. Please contact authorities directly.',
                [{ text: 'OK' }]
              );
            }
            animateCollapse();
          },
        },
      ]
    );
  };

  /**
   * Render individual option button
   */
  const renderOption = (
    animValue: Animated.Value,
    translateY: number,
    option: EmergencyOption
  ) => {
    // Interpolate animation values
    const translateYInterpolate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, translateY],
    });

    const opacityInterpolate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const scaleInterpolate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    });

    return (
      <Animated.View
        key={option.id}
        style={[
          {
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            bottom: 0,
            right: 4,
            transform: [
              { translateY: translateYInterpolate },
              { scale: scaleInterpolate },
            ],
            opacity: opacityInterpolate,
          },
        ]}
      >
        {/* Label - positioned to the left of button */}
        <Animated.View style={[SOSFabStyles.labelContainer, { opacity: opacityInterpolate }]}>
          <Text style={SOSFabStyles.labelText}>{option.label}</Text>
        </Animated.View>

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={option.onPress}
          disabled={option.disabled}
          style={[
            {
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              marginLeft: 8,
            },
          ]}
        >
          {/* SVG Icon */}
          {option.icon}
          
          {/* Disabled overlay */}
          {option.disabled && (
            <View style={SOSFabStyles.disabledOverlay} />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Emergency options configuration with SVG icons
  const MedicalIcon = defaultIcon['medical-emergency-ic'];
  const FireIcon = defaultIcon['fire-emergency-ic'];
  const TheftIcon = defaultIcon['theft-security-ic'];

  const emergencyOptions: EmergencyOption[] = [
    {
      id: 'medical',
      label: 'Medical',
      icon: MedicalIcon ? <MedicalIcon width={36} height={36} /> : null,
      backgroundColor: '#FF3B30',
      onPress: handleMedical,
      disabled: false,
    },
    {
      id: 'theft',
      label: 'Theft',
      icon: TheftIcon ? <TheftIcon width={36} height={36} /> : null,
      backgroundColor: '#007AFF',
      onPress: handleTheft,
      disabled: false,
    },
    {
      id: 'fire',
      label: 'Fire',
      icon: FireIcon ? <FireIcon width={36} height={36} /> : null,
      backgroundColor: '#FF9500',
      onPress: handleFire,
      disabled: false,
    },
  ];

  // Main FAB rotation interpolation
  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
      {/* Backdrop overlay */}
      {isExpanded && (
        <Animated.View
          style={[
            SOSFabStyles.backdrop,
            { opacity: backdropOpacity },
          ]}
        >
          <TouchableOpacity
            style={{ width: '100%', height: '100%' }}
            activeOpacity={1}
            onPress={toggleExpand}
          />
        </Animated.View>
      )}

      {/* FAB Container */}
      <View style={SOSFabStyles.fabContainer}>
        {/* Option Buttons */}
        {isExpanded && (
          <>
            {renderOption(fireAnim, -210, emergencyOptions[2])}
            {renderOption(theftAnim, -140, emergencyOptions[1])}
            {renderOption(medicalAnim, -70, emergencyOptions[0])}
          </>
        )}

        {/* Main FAB Button */}
        <Animated.View
          style={[
            SOSFabStyles.mainFab,
            {
              transform: [{ rotate: rotateInterpolate }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleExpand}
            style={SOSFabStyles.sosIconContainer}
          >
            {/* SOS Icon or Text */}
            <Text style={SOSFabStyles.sosText}>SOS</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Active alarm indicator */}
        {alarmActive && (
          <Animated.View style={SOSFabStyles.alarmActiveIndicator} />
        )}
      </View>
    </>
  );
};

export default SOSFab;

