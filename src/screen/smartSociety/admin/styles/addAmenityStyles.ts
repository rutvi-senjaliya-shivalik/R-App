import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const AddAmenityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
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
  required: {
    color: COLORS.RED || '#FF3B30',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
  },
  inputError: {
    borderColor: COLORS.RED || '#FF3B30',
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
    backgroundColor: COLORS.WHITE,
    minHeight: 100,
    lineHeight: LH.LH20,
  },
  errorText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.RED || '#FF3B30',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  imagePickerButton: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  imagePickerText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  imageContainer: {
    marginTop: 8,
  },
  amenityImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  removeImageButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: COLORS.RED || '#FF3B30',
  },
  removeImageText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  rulesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addRuleText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  ruleInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.WHITE,
  },
  removeRuleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.RED || '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeRuleText: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  submitButton: {
    marginTop: 8,
  },
  loadingContainer: {
    paddingVertical: 14,
    alignItems: 'center',
  },
});

export default AddAmenityStyles;

