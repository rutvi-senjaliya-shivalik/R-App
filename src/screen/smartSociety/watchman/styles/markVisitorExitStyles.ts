import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const MarkVisitorExitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  visitorsList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    gap: 16,
  },
  visitorCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
  },
  visitorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  visitorHeaderLeft: {
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
  activeBadge: {
    backgroundColor: COLORS.YELLOW_BG,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.YELLOW_BORDER,
  },
  activeText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.ORANGE_TEXT,
    lineHeight: LH.LH14,
  },
  visitorDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
    marginBottom: 16,
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
  exitButton: {
    marginTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
});

export default MarkVisitorExitStyles;

