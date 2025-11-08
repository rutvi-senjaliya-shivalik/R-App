import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

export const amenitiesBookingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  amenityInfoCard: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.BLUE_BORDER,
  },
  amenityName: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH27,
    marginBottom: 4,
  },
  amenityDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  sectionTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH24,
    marginBottom: 12,
  },
  selectedDatesContainer: {
    marginTop: 24,
    backgroundColor: COLORS.LIGHT_GREEN,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  selectedDatesTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.GREEN_TEXT,
    lineHeight: LH.LH24,
    marginBottom: 8,
  },
  selectedDate: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREEN_TEXT,
    lineHeight: LH.LH20,
    marginTop: 4,
  },
  submitButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
});

