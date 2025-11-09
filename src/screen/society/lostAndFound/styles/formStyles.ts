import { StyleSheet } from 'react-native';
import { COLORS, FS, LH, FF } from '../../../../constants';

export const lostAndFoundFormStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  requiredStar: {
    color: COLORS.ERROR_COLOR,
  },
  textInput: {
    backgroundColor: COLORS.input.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    padding: 12,
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  textInputFocused: {
    borderColor: COLORS.BLUE_TEXT,
  },
  textInputError: {
    borderColor: COLORS.ERROR_COLOR,
  },
  errorText: {
    fontSize: FS.FS12,
    lineHeight: LH.LH16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    marginTop: 4,
  },
  imagePickerSection: {
    marginBottom: 20,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHT_BLUE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BLUE_BORDER,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  imagePickerButtonText: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[500],
    color: COLORS.BLUE_TEXT,
  },
  imagePreviewContainer: {
    marginTop: 12,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.ERROR_COLOR,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeImageButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS18,
    fontFamily: FF[600],
    lineHeight: LH.LH20,
  },
});

