import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const ExpectedVisitorsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  waitingText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
    width: 100,
  },
  detailValue: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH18,
    flex: 1,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  // Scanned Visitor Card
  scannedCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.OCEAN_BLUE_TEXT,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  scannedCardHeader: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.OCEAN_BLUE_BORDER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scannedCardTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH22,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  scannedCardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  scanAgainButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 6,
  },
  scanAgainButtonText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
  },
  submitButtonContainer: {
    flex: 1,
    marginLeft: 6,
  },
  successContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.LIGHT_GREEN,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  successText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.GREEN_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH22,
  },
});

export default ExpectedVisitorsStyles;

