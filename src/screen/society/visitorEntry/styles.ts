/**
 * Visitor Entry Screen Styles
 * 
 * Follows the app's design system with:
 * - Consistent spacing using 8px grid
 * - Color constants from theme
 * - Typography from font constants
 * - Responsive styling patterns
 */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FS, LH, FF } from '../../../constants';

const { width } = Dimensions.get('window');

export const visitorEntryStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  
  // Keyboard avoiding view
  keyboardAvoidingView: {
    flex: 1,
  },

  // ScrollView styles
  scrollView: {
    flex: 1,
  },
  
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // Space for fixed button at bottom
  },

  // Form container with animation
  formContainer: {
    flex: 1,
  },

  // Header text styles
  headerText: {
    fontSize: FS.FS24,
    lineHeight: LH.LH30,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },

  subHeaderText: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 24,
  },

  // Input container with spacing
  inputContainer: {
    marginBottom: 20,
  },

  // Label styles
  label: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },

  requiredStar: {
    color: COLORS.ERROR_COLOR,
    fontSize: FS.FS14,
  },

  // Image upload section
  imageSection: {
    marginBottom: 24,
    marginTop: 8,
  },

  imagePickerButton: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderWidth: 1,
    borderColor: COLORS.BLUE_BORDER,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  imagePickerButtonText: {
    fontSize: FS.FS15,
    lineHeight: LH.LH22,
    fontFamily: FF[500],
    color: COLORS.DARK_BLUE,
  },

  // Image preview container
  imagePreviewContainer: {
    marginTop: 16,
    position: 'relative',
    alignSelf: 'center',
  },

  imagePreview: {
    width: width - 32,
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },

  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.ERROR_COLOR,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  removeImageButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS24,
    fontFamily: FF[700],
    lineHeight: FS.FS24,
  },

  // Submit button container - fixed at bottom center
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    // backgroundColor: COLORS.WHITE,
    // borderTopWidth: 1,
    // borderTopColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },

  submitButton: {
    width: '100%',
    alignSelf: 'center',
  },
});

