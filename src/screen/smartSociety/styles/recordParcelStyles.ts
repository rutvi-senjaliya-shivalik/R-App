import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const RecordParcelStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 16,
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
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH22,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputWrapperLast: {
    marginBottom: 0,
  },
  inputContainer: {
    marginTop: 4,
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    marginBottom: 4,
  },
  required: {
    color: COLORS.ERROR_COLOR,
    fontSize: FS.FS14,
    fontFamily: FF[700],
  },
  errorText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    marginTop: 4,
    lineHeight: LH.LH16,
  },
  // Image Styles
  imageButtonsContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  addImageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
  },
  addImageIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.OCEAN_BLUE_TEXT,
    marginRight: 8,
  },
  addImageText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginTop: 6,
  },
  parcelImage: {
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
  buttonContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
});

export default RecordParcelStyles;

