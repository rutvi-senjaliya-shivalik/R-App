/**
 * SOS FAB Component Styles
 * 
 * Styling for the floating action button and emergency option buttons
 */

import { StyleSheet, Platform } from 'react-native';

const SOSFabStyles = StyleSheet.create({
  // Main container positioned at bottom-right
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 999,
  },

  // Backdrop overlay when FAB is expanded
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },

  // Main FAB button styling
  mainFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF3B30', // iOS red
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    zIndex: 1000,
  },

  // SOS icon container
  sosIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // SOS text styling
  sosText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // Option button container (positioned absolutely)
  optionButton: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    bottom: 0,
    right: 4, // Center align with main FAB (56-48)/2 = 4
  },

  // Individual option button inner container
  optionButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Medical option specific styling
  medicalOption: {
    backgroundColor: '#FF3B30', // Red
  },

  // Fire option specific styling
  fireOption: {
    backgroundColor: '#FF9500', // Orange
  },

  // Theft option specific styling (disabled)
  theftOption: {
    backgroundColor: '#007AFF', // Blue
    opacity: 0.5,
  },

  // Option icon styling
  optionIcon: {
    width: 28,
    height: 28,
    // Note: Don't use tintColor for colored PNG icons
  },

  // Option label styling (for text-based icons)
  optionLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },

  // Fallback icon (emoji or text when image not available)
  fallbackIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },

  // Disabled state overlay
  disabledOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Active alarm indicator (pulsing border)
  alarmActiveIndicator: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF3B30',
    top: -2,
    left: -2,
  },

  // Label container for option buttons
  labelContainer: {
    position: 'absolute',
    right: 56,
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Label text
  labelText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SOSFabStyles;

