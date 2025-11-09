import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const ReceiptScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  receiptHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.GREEN_TEXT + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  successIconText: {
    fontSize: FS.FS32,
    color: COLORS.GREEN_TEXT,
    fontFamily: FF[700],
  },
  successTitle: {
    fontSize: FS.FS22,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 6,
    lineHeight: LH.LH28,
  },
  successSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH20,
  },
  receiptCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  receiptHeaderSection: {
    marginBottom: 16,
  },
  receiptTitle: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH24,
  },
  receiptDate: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: COLORS.BORDER_GREY,
    marginVertical: 16,
  },
  receiptSection: {
    marginBottom: 8,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  receiptLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
    flex: 1,
  },
  receiptValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    flex: 1,
    textAlign: 'right',
  },
  chargesTitle: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chargesList: {
    gap: 10,
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  chargeLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  chargeValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  penaltyValue: {
    color: COLORS.ERROR_COLOR,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  totalAmount: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.GREEN_TEXT,
    lineHeight: LH.LH28,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  shareButton: {
    flex: 1,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  shareButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH18,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH18,
  },
  footerNote: {
    alignItems: 'center',
    paddingTop: 16,
  },
  footerNoteText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH16,
  },
});

export default ReceiptScreenStyles;

