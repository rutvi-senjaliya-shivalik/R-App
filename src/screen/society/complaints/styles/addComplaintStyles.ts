import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

export const addComplaintStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    marginTop: 16,
  },
  inputNoBorder: {
    height: 48,
    borderColor: COLORS.BORDER_GREY,
    backgroundColor: 'transparent',
  },
  textArea: {
    minHeight: 120,
    borderColor: COLORS.BORDER_GREY,
    borderBottomWidth: 0.5,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginTop: 5,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  errorText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.RED || '#F44336',
    marginTop: 4,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    borderStyle: 'dashed',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHT_GREY || '#F9F9F9',
  },
  uploadButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLUE_TEXT,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.LIGHT_GREY || '#F9F9F9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS18,
    fontFamily: FF[600],
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 20,
  },
});

