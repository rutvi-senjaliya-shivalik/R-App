/**
 * MyParking Screen Styles
 * 
 * Defines styling for parking slot display with status indicators
 */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FS, LH, FF } from '../../../constants';

const { width } = Dimensions.get('window');
const PARKING_CARD_WIDTH = Math.min((width - 64) / 2, 140);

export const myParkingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  parkingSlotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  parkingCard: {
    width: PARKING_CARD_WIDTH,
    aspectRatio: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.BORDER_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 16,
  },
  parkingCardAvailable: {
    borderColor: COLORS.GREEN_TEXT,
    backgroundColor: COLORS.LIGHT_GREEN,
  },
  parkingCardOccupied: {
    borderColor: COLORS.ORANGE_BORDER,
    backgroundColor: COLORS.ORANGE_BG,
  },
  parkingNumber: {
    fontSize: FS.FS32,
    lineHeight: LH.LH44,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
  },
  parkingNumberAvailable: {
    color: COLORS.GREEN_TEXT,
  },
  parkingNumberOccupied: {
    color: COLORS.ORANGE_TEXT,
  },
  iconContainer: {
    width: 48,
    height: 48,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  statusBadgeAvailable: {
    backgroundColor: COLORS.GREEN_TEXT,
  },
  statusBadgeOccupied: {
    backgroundColor: COLORS.ORANGE_TEXT,
  },
  statusText: {
    fontSize: FS.FS12,
    lineHeight: LH.LH16,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 2,
    height: 120,
    backgroundColor: COLORS.BORDER_GREY,
  },
});

