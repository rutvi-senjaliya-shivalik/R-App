import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FF, FS } from '../../constants';

interface AppHeaderProps {
  title?: string;
  onBellPress?: () => void;
  onProfilePress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = () => (
  <Svg width="29" height="29" viewBox="0 0 29 29" fill="none">
    <Path
      d="M9.27888 23.769C10.3142 25.0782 11.8935 25.8393 13.5625 25.8334C15.2316 25.8393 16.8108 25.0782 17.8462 23.769C15.0034 24.1538 12.1217 24.1538 9.27888 23.769Z"
      fill="black"
    />
    <Path
      d="M21.4887 10.5682V11.3949C21.4887 12.3871 21.7705 13.357 22.3012 14.1825L23.6023 16.2057C24.7895 18.054 23.883 20.5657 21.8175 21.1493C16.4203 22.6778 10.7047 22.6778 5.30759 21.1493C3.24209 20.5657 2.33557 18.054 3.52274 16.2057L4.8238 14.1825C5.35598 13.3502 5.63839 12.3828 5.63755 11.3949V10.5682C5.63755 6.02857 9.18611 2.34849 13.5625 2.34849C17.9389 2.34849 21.4887 6.02857 21.4887 10.5682Z"
      fill="black"
    />
  </Svg>
);

const ProfileIcon = () => (
  <View style={styles.profileAvatar}>
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <Path
        d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0Z"
        fill="#D1D5DB"
      />
      <Path
        d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z"
        fill="#6B7280"
      />
      <Path
        d="M20 22C13.3726 22 8 27.3726 8 34C8 34.5523 8.44772 35 9 35H31C31.5523 35 32 34.5523 32 34C32 27.3726 26.6274 22 20 22Z"
        fill="#6B7280"
      />
    </Svg>
  </View>
);

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = 'Shivalik CP', 
  onBellPress, 
  onProfilePress,
  showBackButton = false,
  onBackPress
}) => {
  return (
    <>
    <StatusBar
        barStyle="dark-content"
        backgroundColor="#E6E6E6" // same as header background
        translucent={false} // prevents white bar on Android
      />
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onBellPress}
          activeOpacity={0.7}
        >
          <BellIcon />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <ProfileIcon />
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6E6',
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  paddingHorizontal: 16,
  paddingVertical: Platform.OS === 'ios' ? 20 : 14,
  paddingTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.BLACK,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D5DB',
  },
});

export default AppHeader;
