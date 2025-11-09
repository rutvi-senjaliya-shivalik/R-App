import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const VisitorLogsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  filterTabText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  filterTabTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  logsList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16,
  },
  logCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logHeaderLeft: {
    flex: 1,
  },
  visitorName: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH20,
  },
  visitorPhone: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  statusIcon: {
    fontSize: FS.FS12,
  },
  statusText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    lineHeight: LH.LH14,
  },
  logDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
    flex: 1,
  },
  detailValue: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH18,
    flex: 1,
    textAlign: 'right',
  },
  activeIndicator: {
    marginTop: 8,
    padding: 8,
    backgroundColor: COLORS.YELLOW_BG,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.YELLOW_BORDER,
  },
  activeText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.ORANGE_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH16,
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

export default VisitorLogsStyles;

