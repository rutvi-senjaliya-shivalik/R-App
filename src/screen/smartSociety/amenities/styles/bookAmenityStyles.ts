import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const BookAmenityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  amenityInfoCard: {
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  amenityName: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
  },
  rateText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.DARK_BLUE,
  },
  section: {
    marginBottom: 20,
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
    justifyContent: 'center',
  },
  disabledInput: {
    backgroundColor: COLORS.LIGHT_GRAY,
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  costCard: {
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
  },
  costValue: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.DARK_BLUE,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.DARK_BLUE,
    lineHeight: LH.LH20,
  },
  submitButton: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  halfButton: {
    flex: 1,
  },
  payNowButton: {
    backgroundColor: COLORS.DARK_BLUE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  bookButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  paymentNote: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default BookAmenityStyles;

