import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const AddEventStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    color: COLORS.BLACK_TEXT,
    minHeight: 48,
  },
  inputText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  placeholderText: {
    color: COLORS.GREY_TEXT,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.LIGHT_GRAY,
    minHeight: 120,
    lineHeight: LH.LH20,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    minHeight: 48,
  },
  imagePickerText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH20,
  },
  imageContainer: {
    marginTop: 8,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  removeImageButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.ERROR_COLOR,
    marginTop: 8,
  },
  removeImageText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  switchLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  switchSubLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: 4,
    lineHeight: LH.LH16,
  },
  amountContainer: {
    marginTop: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.LIGHT_GRAY,
    minHeight: 48,
  },
  currencySymbol: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    paddingVertical: 12,
    lineHeight: LH.LH20,
  },
  required: {
    color: COLORS.ERROR_COLOR,
  },
  helperText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: 6,
    lineHeight: LH.LH16,
    fontStyle: 'italic',
  },
  dropdownWrapper: {
    marginTop: 0,
  },
});

export default AddEventStyles;
