import { StyleSheet } from 'react-native';
import {COLORS, FF, FS, LH} from '../../../constants';
import { isTabletDevice } from '../../../utils/constants';

export const textInputStyles = () => {
  return StyleSheet.create({
    inputWrapper: {
      flexDirection: 'row',
      width: '100%',
      height: isTabletDevice ? 64 : 48,
      borderWidth: 1,
      borderColor: COLORS.input.inputBorder,
      backgroundColor: COLORS.input.inputBackground,
      paddingHorizontal: 16,
      alignItems: 'center',
      borderRadius: 8,
    },
    outlinedInputWrapper: {
      height: isTabletDevice ? 72 : 54,
    },
    multilineInputWrapper: {
      height: 96,
    },
    activeInputWrapper: {
      borderColor: COLORS.input.focusedStr,
    },
    invalidInputWrapper: {
      borderColor: COLORS.input.invalidStr,
    },
    disabledInputWrapper: {
      backgroundColor: COLORS.input.disableStr,
    },
    readonlyInputWrapper: {
      backgroundColor: COLORS.input.readonlyStr,
    },
    input: {
      flex: 1,
      height: '100%',
      color: COLORS.input.default,
      fontSize: FS.FS18,
      fontFamily: FF[500],
      lineHeight: LH.LH20,
    },
    multilineInput: {
      textAlignVertical: 'top',
      paddingTop: 12,
      lineHeight: LH.LH20,
    },
    readonlyInput: {
      color: COLORS.text.readonly,
    },
    disabledInput: {
      color: COLORS.text.disabled,
    },
    label: {
      fontSize: FS.FS12,
      fontFamily: FF[400],
      fontWeight: '400',
      lineHeight: LH.LH18,
      color: COLORS.text.label,
      marginBottom: 8,
      textAlign: 'left',
    },
    star: {
      fontSize: FS.FS12,
      fontFamily: FF[400],
      fontWeight: '400',
      lineHeight: LH.LH18,
      color: COLORS.text.label,
    },
    messageText: {
      color: COLORS.text.primary,
      marginTop: 4,
      textAlign: 'left',
      fontSize: FS.FS12,
      fontFamily: FF[400],
      lineHeight: LH.LH18,
    },
    errorMessageText: {
      color: COLORS.text.invalid,
    },
  });
};
