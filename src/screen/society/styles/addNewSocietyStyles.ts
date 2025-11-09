import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { FF, FS, LH } from '../../../constants/fonts';

const AddNewSocietyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 24,
    lineHeight: LH.LH20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  required: {
    color: COLORS.RED,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.WHITE,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.WHITE,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.ERROR_COLOR,
    borderWidth: 1,
  },
  errorText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  cancelButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
});

export default AddNewSocietyStyles;

