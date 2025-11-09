import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const AddVisitorEntryStyles = StyleSheet.create({
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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  chipActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  chipText: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  chipTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  submitButton: {
    marginTop: 8,
  },
  // Image Capture Styles
  imageSection: {
    marginTop: 8,
  },
  captureImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    borderStyle: 'dashed',
  },
  cameraIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: COLORS.OCEAN_BLUE_TEXT,
  },
  captureImageText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  visitorImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  removeImageText: {
    color: COLORS.WHITE,
    fontSize: FS.FS16,
    fontFamily: FF[700],
    lineHeight: LH.LH20,
  },
  errorText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.RED,
    marginTop: 6,
    lineHeight: LH.LH16,
  },
});

export default AddVisitorEntryStyles;

