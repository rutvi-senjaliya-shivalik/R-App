import { MakeApiRequest } from './apiService';
import { GET } from '../constants/api';
import { Alert } from 'react-native';
import Sound from 'react-native-sound';

let pollingInterval: NodeJS.Timeout | null = null;
let lastAlertId: string | null = null;
let isAlarmPlaying = false;
let alarmSound: Sound | null = null;

// Initialize alarm sound
const initializeAlarm = () => {
  if (!alarmSound) {
    Sound.setCategory('Playback');
    // Load alarm sound from app bundle
    alarmSound = new Sound(require('../assets/music/alarm.mp3'), error => {
      if (error) {
        console.error('Failed to load alarm sound', error);
        return;
      }
      console.log('✅ Alarm sound loaded successfully');
    });
  }
};

// Play alarm sound
export const playAlarm = () => {
  if (isAlarmPlaying) return;

  isAlarmPlaying = true;
  console.log('🚨 ALARM TRIGGERED - Playing emergency sound');

  // Show alert dialog
  Alert.alert(
    '🚨 EMERGENCY ALERT',
    'An emergency SOS alert has been triggered for your building. Please stay safe and follow emergency protocols.',
    [
      {
        text: 'Acknowledge',
        onPress: () => {
          console.log('Emergency alert acknowledged');
        },
      },
    ],
    { cancelable: false },
  );

  // Play alarm sound
  initializeAlarm();

  if (alarmSound) {
    alarmSound.setNumberOfLoops(-1); // Loop indefinitely
    alarmSound.setVolume(1.0); // Maximum volume
    alarmSound.play(success => {
      if (!success) {
        console.error('Alarm playback failed');
      } else {
        console.log('🔊 Alarm playing');
      }
    });
  }
};

// Stop alarm sound
export const stopAlarm = () => {
  if (!isAlarmPlaying) return;

  isAlarmPlaying = false;
  console.log('Alarm stopped');

  if (alarmSound && alarmSound.isPlaying()) {
    alarmSound.stop(() => {
      console.log('🔇 Alarm stopped');
    });
  }
};

// Check for active SOS alerts
const checkForActiveSosAlerts = async (buildingId: string) => {
  try {
    const response = await MakeApiRequest({
      apiUrl: `http://10.0.2.2:5000/api/sos/active?buildingId=${buildingId}`,
      apiMethod: GET,
    });

    if (response.data.success && response.data.data.length > 0) {
      const activeAlert = response.data.data[0];

      // If this is a new alert (different from the last one), play the alarm
      if (activeAlert._id !== lastAlertId) {
        lastAlertId = activeAlert._id;
        console.log('🚨 NEW EMERGENCY ALERT DETECTED:', activeAlert.message);
        playAlarm();
      }
    } else {
      // No active alerts, stop alarm if playing
      if (lastAlertId !== null) {
        console.log('Emergency alert cleared');
        stopAlarm();
        lastAlertId = null;
      }
    }
  } catch (error) {
    console.error('Error checking for SOS alerts:', error);
  }
};

// Start polling for SOS alerts
export const startSosPolling = (buildingId: string) => {
  if (!buildingId) {
    console.warn('Cannot start SOS polling: No buildingId provided');
    return;
  }

  // Clear any existing interval
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }

  // Initialize alarm sound
  initializeAlarm();

  // Check immediately
  checkForActiveSosAlerts(buildingId);

  // Poll every 10 seconds
  pollingInterval = setInterval(() => {
    checkForActiveSosAlerts(buildingId);
  }, 10000);

  console.log('✅ SOS polling started for building:', buildingId);
};

// Stop polling for SOS alerts
export const stopSosPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }

  stopAlarm();
  lastAlertId = null;

  console.log('SOS polling stopped');
};

// Release sound resources
export const releaseSosResources = () => {
  stopSosPolling();

  if (alarmSound) {
    alarmSound.release();
    alarmSound = null;
  }

  console.log('SOS resources released');
};
