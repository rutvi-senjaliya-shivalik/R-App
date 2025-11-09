import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const PaymentScreenStyles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  billSummaryCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH22,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  summaryValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.BORDER_GREY,
    marginVertical: 12,
  },
  chargesSection: {
    gap: 8,
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
  totalRow: {
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
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH28,
  },
  paymentMethodsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH22,
  },
  paymentMethodsList: {
    gap: 12,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  paymentMethodCardActive: {
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
  },
  paymentMethodIcon: {
    fontSize: FS.FS24,
    marginRight: 12,
  },
  paymentMethodName: {
    flex: 1,
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  paymentMethodNameActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: FS.FS14,
    fontFamily: FF[700],
    color: COLORS.WHITE,
    lineHeight: LH.LH18,
  },
  buttonContainer: {
    marginTop: 24,
  },
  securityNote: {
    marginTop: 20,
    alignItems: 'center',
  },
  securityNoteText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH16,
  },
});

export default PaymentScreenStyles;

