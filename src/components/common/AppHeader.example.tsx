/**
 * AppHeader Component Usage Example
 * 
 * This file demonstrates how to use the AppHeader component in your screens.
 */

import React from 'react';
import { View, Alert } from 'react-native';
import { AppHeader } from './index';
import { COLORS } from '../../constants';

// Example 1: Basic Usage
const ExampleScreen1 = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <AppHeader 
        onBellPress={() => Alert.alert('Notifications', 'No new notifications')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      {/* Your screen content here */}
    </View>
  );
};

// Example 2: With Custom Handlers
const ExampleScreen2 = ({ navigation }: any) => {
  const handleBellPress = () => {
    // Navigate to notifications screen
    navigation.navigate('Notifications');
  };

  const handleProfilePress = () => {
    // Navigate to profile settings
    navigation.navigate('ProfileSetting');
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <AppHeader 
        onBellPress={handleBellPress}
        onProfilePress={handleProfilePress}
      />
      {/* Your screen content here */}
    </View>
  );
};

// Example 3: Without handlers (icons will still be visible but won't do anything)
const ExampleScreen3 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <AppHeader />
      {/* Your screen content here */}
    </View>
  );
};

export { ExampleScreen1, ExampleScreen2, ExampleScreen3 };
