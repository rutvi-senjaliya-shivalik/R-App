import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const NoticesListStyles = StyleSheet.create({
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
    flexWrap: 'wrap',
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
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
  noticesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  noticeCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
  },
  unreadCard: {
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    backgroundColor: COLORS.OCEAN_BLUE_BG + '20',
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noticeHeaderLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  categoryBadge: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    lineHeight: LH.LH14,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
  },
  title: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH20,
  },
  description: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
    marginBottom: 12,
  },
  dateText: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH14,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: FS.FS28,
    fontFamily: FF[400],
    color: COLORS.WHITE,
    lineHeight: LH.LH30,
  },
});

export default NoticesListStyles;

