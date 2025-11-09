import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const MyBillsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderColor: COLORS.BORDER_GREY,
  },
  filterTabText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  filterTabTextActive: {
    color: COLORS.BLACK_TEXT,
    fontFamily: FF[600],
  },
  billsList: {
    gap: 16,
  },
  billCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: 16,
  },
  overdueCard: {
    borderColor: COLORS.ERROR_COLOR,
    backgroundColor: COLORS.ERROR_COLOR + '08',
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  billPeriodLabel: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 2,
    lineHeight: LH.LH14,
  },
  billPeriod: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH20,
  },
  billFlatNo: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    lineHeight: LH.LH14,
  },
  chargesContainer: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  chargeLabel: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  chargeValue: {
    fontSize: FS.FS13,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH18,
  },
  billFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  totalLabel: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 2,
    lineHeight: LH.LH14,
  },
  totalAmount: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH24,
  },
  dueDate: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH14,
  },
  payButton: {
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[700],
    color: COLORS.WHITE,
  },
  receiptButton: {
    backgroundColor: COLORS.GREEN_TEXT,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[700],
    color: COLORS.WHITE,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH24,
  },
});

export default MyBillsStyles;
