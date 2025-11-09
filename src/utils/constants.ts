import { KeyboardEventName, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isTabletDevice = DeviceInfo.isTablet();

export const KEYBOARD_SHOW_EVENT: KeyboardEventName =
  Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
export const KEYBOARD_HIDE_EVENT: KeyboardEventName =
  Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
export const KEYBOARD_FRAME_CHANGE_EVENT: KeyboardEventName =
  Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidChangeFrame';


