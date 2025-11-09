import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

export const formStyles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    marginBottom: 8,
  },
  filePickerButton: {
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  filePickerText: {
    color: COLORS.DARK_BLUE,
    fontWeight: '600',
    fontSize: FS.FS14,
    fontFamily: FF[600],
  },
});

