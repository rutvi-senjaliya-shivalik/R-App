import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const AddVisitorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  // Header Section
  headerSection: {
    marginBottom: 24,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  headerIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.OCEAN_BLUE_TEXT,
  },
  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: FS.FS22,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 6,
    lineHeight: LH.LH28,
  },
  headerSubtitle: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  // Card Styles
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.OCEAN_BLUE_BORDER,
  },
  cardTitle: {
    fontSize: FS.FS15,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH20,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // Input Styles
  inputWrapper: {
    marginBottom: 18,
  },
  inputWrapperLast: {
    marginBottom: 0,
  },
  inputContainer: {
    marginTop: 6,
  },
  label: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH18,
    marginBottom: 2,
  },
  required: {
    color: COLORS.ERROR_COLOR,
    fontSize: FS.FS13,
    fontFamily: FF[600],
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  // QR Scan Section
  qrSection: {
    marginBottom: 16,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    borderRadius: 8,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.WHITE,
    marginRight: 8,
  },
  qrButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH22,
  },
  // Image Capture Styles
  imageSection: {
    marginTop: 6,
  },
  captureImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.OCEAN_BLUE_TEXT,
    marginRight: 8,
  },
  captureImageText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  visitorImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
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
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeImageText: {
    color: COLORS.WHITE,
    fontSize: FS.FS18,
    fontFamily: FF[700],
    lineHeight: LH.LH20,
  },
  errorText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    marginTop: 4,
    lineHeight: LH.LH16,
  },
  // Button Container
  buttonContainer: {
    marginTop: 12,
    marginBottom: 20,
  },
});

export default AddVisitorStyles;

