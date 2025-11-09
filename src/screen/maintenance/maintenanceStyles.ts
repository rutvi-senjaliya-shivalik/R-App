import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH, SPACING, BORDER_RADIUS } from '../../constants';

const maintenanceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
  },
  listContainer: { padding: SPACING.XL },
  listContentEmpty: {
    flex: 1,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.LG,
  },
  emptyText: {
    fontFamily: FF[500],
    fontSize: FS.FS16,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH20,
  },
  emptySubText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: SPACING.SM,
    lineHeight: LH.LH16,
  },

  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.LG },
  month: {
    fontFamily: FF[600],
    fontSize: FS.FS18,
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
    lineHeight: LH.LH24,
  },
  amount: {
    fontFamily: FF[700],
    fontSize: FS.FS20,
    color: COLORS.BLACK,
    lineHeight: LH.LH28,
  },
  due: {
    marginTop: SPACING.SM,
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  statusBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },
  paid: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  pending: {
    backgroundColor: COLORS.ORANGE_BG,
    borderWidth: 1,
    borderColor: COLORS.ORANGE_BORDER,
  },
  overdue: {
    backgroundColor: '#FDECEA',
    borderWidth: 1,
    borderColor: '#F1AEA9',
  },
  statusText: {
    fontFamily: FF[700],
    fontSize: FS.FS10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  statusTextPaid: {
    color: COLORS.GREEN_TEXT,
  },
  statusTextPending: {
    color: COLORS.ORANGE_TEXT,
  },
  statusTextOverdue: {
    color: COLORS.ERROR_COLOR,
  },
  actions: { flexDirection: 'row', alignItems: 'center' },
  detailsBtn: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    marginRight: SPACING.SM,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  detailsBtnText: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },
  payBtn: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.BLACK,
    borderRadius: BORDER_RADIUS.SM,
  },
  payBtnText: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: FS.FS16,
    color: COLORS.GREY_TEXT,
  },

  // Details page
  detailsHeader: { marginBottom: SPACING.XL, paddingTop: SPACING.SM },
  billTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS24,
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
    lineHeight: LH.LH32,
  },
  billStatus: {
    fontFamily: FF[500],
    fontSize: FS.FS15,
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.XS,
    lineHeight: LH.LH20,
  },
  amountCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.XL,
    marginBottom: SPACING.XXL,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  amountLabel: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.SM,
    letterSpacing: 0.5,
    lineHeight: LH.LH16,
  },
  amountLarge: {
    fontFamily: FF[700],
    fontSize: 40,
    color: COLORS.BLACK,
    letterSpacing: -1,
  },
  dueLabel: {
    fontFamily: FF[700],
    fontSize: FS.FS13,
    color: COLORS.ERROR_COLOR,
    marginTop: SPACING.SM,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: LH.LH16,
  },

  sectionTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS17,
    color: COLORS.BLACK,
    marginBottom: SPACING.MD,
    marginTop: SPACING.SM,
    lineHeight: LH.LH24,
  },
  breakdownContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.XXL,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.SM },
  breakdownLabel: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  breakdownValue: {
    fontFamily: FF[700],
    fontSize: FS.FS14,
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },
  divider: { height: 1, backgroundColor: COLORS.BORDER_GREY, marginVertical: SPACING.XS },
  breakdownTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.SM,
    paddingTop: SPACING.MD,
    borderTopWidth: 2,
    borderTopColor: COLORS.BLACK
  },
  breakdownTotalLabel: {
    fontFamily: FF[700],
    fontSize: FS.FS16,
    color: COLORS.BLACK,
    lineHeight: LH.LH24,
  },
  breakdownTotalValue: {
    fontFamily: FF[700],
    fontSize: FS.FS20,
    color: COLORS.BLACK,
    lineHeight: LH.LH28,
  },

  paidInfo: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.XXL,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  paidInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.SM,
    paddingVertical: SPACING.XS
  },
  paidInfoLabel: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.GREEN_TEXT,
    lineHeight: LH.LH20,
  },
  paidInfoValue: {
    fontFamily: FF[700],
    fontSize: FS.FS14,
    color: COLORS.GREEN_TEXT,
    lineHeight: LH.LH20,
  },
  paidBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.GREEN_TEXT,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.SM,
    marginBottom: SPACING.MD,
  },
  paidBadgeText: {
    fontFamily: FF[700],
    color: COLORS.WHITE,
    fontSize: FS.FS10,
    letterSpacing: 1,
  },

  // Payment Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: BORDER_RADIUS.XL,
    borderTopRightRadius: BORDER_RADIUS.XL,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XXL,
    paddingBottom: SPACING.XXXL,
    maxHeight: '85%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.XL
  },
  modalTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS20,
    color: COLORS.BLACK,
    lineHeight: LH.LH28,
  },
  closeButton: { padding: SPACING.XS },
  closeButtonText: {
    fontSize: 28,
    color: COLORS.GREY_TEXT,
    fontFamily: FF[300],
  },

  modalSection: { marginBottom: SPACING.XXL },
  modalSectionTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS15,
    color: COLORS.BLACK,
    marginBottom: SPACING.MD,
    lineHeight: LH.LH20,
  },

  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 2,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: SPACING.SM,
    backgroundColor: COLORS.WHITE,
  },
  paymentMethodSelected: {
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  paymentMethodIcon: { fontSize: 28, marginRight: SPACING.MD },
  paymentMethodInfo: { flex: 1 },
  paymentMethodName: {
    fontFamily: FF[600],
    fontSize: FS.FS15,
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },
  paymentMethodDesc: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
    marginTop: 2,
    lineHeight: LH.LH16,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.BORDER_GREY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioOuterSelected: { borderColor: COLORS.BLACK },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.BLACK },

  billSummaryCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.XXL,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.SM
  },
  summaryLabel: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  summaryValue: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
    marginTop: SPACING.XS
  },
  summaryTotalLabel: {
    fontFamily: FF[700],
    fontSize: FS.FS16,
    color: COLORS.BLACK,
    lineHeight: LH.LH24,
  },
  summaryTotalValue: {
    fontFamily: FF[700],
    fontSize: FS.FS18,
    color: COLORS.BLACK,
    lineHeight: LH.LH24,
  },

  confirmButton: {
    backgroundColor: COLORS.BLACK,
    borderRadius: BORDER_RADIUS.MD,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: COLORS.BORDER_GREY,
  },
  confirmButtonText: {
    fontFamily: FF[700],
    fontSize: FS.FS16,
    color: COLORS.WHITE,
    lineHeight: LH.LH24,
  },

  processingContainer: { alignItems: 'center', paddingVertical: SPACING.XXXL },
  processingText: {
    fontFamily: FF[400],
    fontSize: FS.FS16,
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.LG,
    lineHeight: LH.LH24,
  },
  processingSubtext: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.SM,
    textAlign: 'center',
    lineHeight: LH.LH16,
  },
});

export default maintenanceStyles;
