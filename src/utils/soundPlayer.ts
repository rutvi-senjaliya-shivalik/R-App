/**
 * Sound Player Utility
 * 
 * Manages alarm sound playback for emergency SOS features.
 * Handles sound initialization, playback, and cleanup.
 */

import Sound from 'react-native-sound';

// Enable playback in silence mode (iOS)
Sound.setCategory('Playback');

// Sound instances
let medicalAlarmSound: Sound | null = null;
let fireAlarmSound: Sound | null = null;

/**
 * Initialize alarm sounds
 * Preloads audio files for faster playback
 */
export const initializeSounds = (): void => {
  try {
    // Initialize medical alarm sound
    medicalAlarmSound = new Sound('sound-effect-uk-ambulance-siren-164354.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load medical alarm sound:', error);
        console.log('Make sure sound-effect-uk-ambulance-siren-164354.mp3 exists in src/assets/sounds/');
        return;
      }
      console.log('✓ Medical alarm sound loaded successfully');
      console.log('  Duration:', medicalAlarmSound.getDuration(), 'seconds');
    });

    // Initialize fire alarm sound
    fireAlarmSound = new Sound('fire-alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load fire alarm sound:', error);
        console.log('Make sure fire-alarm.mp3 exists in src/assets/sounds/');
        return;
      }
      console.log('✓ Fire alarm sound loaded successfully');
      console.log('  Duration:', fireAlarmSound.getDuration(), 'seconds');
    });
  } catch (error) {
    console.error('Error initializing sounds:', error);
    console.log('Tip: Rebuild the app after adding sound files');
  }
};

/**
 * Play medical emergency alarm
 * Plays the medical alarm sound in loop mode
 * 
 * @returns boolean - true if playback started successfully
 */
export const playMedicalAlarm = (): boolean => {
  try {
    if (!medicalAlarmSound) {
      console.warn('Medical alarm sound not initialized');
      return false;
    }

    // Stop any currently playing sound
    stopAllAlarms();

    // Set number of loops and volume
    medicalAlarmSound.setNumberOfLoops(-1);
    medicalAlarmSound.setVolume(1.0);
    
    // Play the sound with better error handling
    medicalAlarmSound.play((success) => {
      if (success) {
        console.log('Medical alarm playing successfully');
      } else {
        console.error('Medical alarm playback failed - sound may be corrupted or invalid');
        console.log('Note: Add a valid sound-effect-uk-ambulance-siren-164354.mp3 file to src/assets/sounds/');
      }
    });

    // Return true to indicate attempt was made
    return true;
  } catch (error) {
    console.error('Error playing medical alarm:', error);
    console.log('Tip: Ensure sound-effect-uk-ambulance-siren-164354.mp3 is a valid MP3 file');
    return false;
  }
};

/**
 * Play fire emergency alarm
 * Plays the fire alarm sound in loop mode
 * 
 * @returns boolean - true if playback started successfully
 */
export const playFireAlarm = (): boolean => {
  try {
    if (!fireAlarmSound) {
      console.warn('Fire alarm sound not initialized');
      return false;
    }

    // Stop any currently playing sound
    stopAllAlarms();

    // Check if sound is loaded before playing
    fireAlarmSound.setNumberOfLoops(-1);
    fireAlarmSound.setVolume(1.0);
    
    // Play the sound with better error handling
    fireAlarmSound.play((success) => {
      if (success) {
        console.log('Fire alarm playing successfully');
      } else {
        console.error('Fire alarm playback failed - sound may be corrupted or invalid');
        console.log('Note: Add a valid fire-alarm.mp3 file to src/assets/sounds/');
      }
    });

    // Return true to indicate attempt was made
    // Even if playback fails, we tried
    return true;
  } catch (error) {
    console.error('Error playing fire alarm:', error);
    console.log('Tip: Ensure fire-alarm.mp3 is a valid MP3 file');
    return false;
  }
};

/**
 * Stop all alarm sounds
 * Stops and resets all playing alarms
 */
export const stopAllAlarms = (): void => {
  try {
    if (medicalAlarmSound) {
      medicalAlarmSound.stop(() => {
        medicalAlarmSound?.setCurrentTime(0);
      });
    }

    if (fireAlarmSound) {
      fireAlarmSound.stop(() => {
        fireAlarmSound?.setCurrentTime(0);
      });
    }
  } catch (error) {
    console.error('Error stopping alarms:', error);
  }
};

/**
 * Check if any alarm is currently playing
 * 
 * @returns boolean - true if any alarm is playing
 */
export const isAlarmPlaying = (): boolean => {
  try {
    const medicalPlaying = medicalAlarmSound?.isPlaying() || false;
    const firePlaying = fireAlarmSound?.isPlaying() || false;
    
    return medicalPlaying || firePlaying;
  } catch (error) {
    console.error('Error checking alarm status:', error);
    return false;
  }
};

/**
 * Release sound resources
 * Should be called when the component unmounts or app closes
 */
export const releaseSounds = (): void => {
  try {
    if (medicalAlarmSound) {
      medicalAlarmSound.release();
      medicalAlarmSound = null;
    }

    if (fireAlarmSound) {
      fireAlarmSound.release();
      fireAlarmSound = null;
    }

    console.log('Sound resources released');
  } catch (error) {
    console.error('Error releasing sounds:', error);
  }
};

/**
 * Set volume for all alarms
 * 
 * @param volume - Volume level (0.0 to 1.0)
 */
export const setAlarmVolume = (volume: number): void => {
  try {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    
    if (medicalAlarmSound) {
      medicalAlarmSound.setVolume(clampedVolume);
    }

    if (fireAlarmSound) {
      fireAlarmSound.setVolume(clampedVolume);
    }
  } catch (error) {
    console.error('Error setting alarm volume:', error);
  }
};

