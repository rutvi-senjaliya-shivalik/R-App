import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const AddLostFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH20,
  },
  required: {
    color: COLORS.ERROR_COLOR,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeButtonActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  typeButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  typeButtonTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  input: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  textArea: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  imagePreview: {
    marginTop: 12,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.ERROR_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH24,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default AddLostFoundStyles;

