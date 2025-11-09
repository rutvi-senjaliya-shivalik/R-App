import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const EventsListStyles = StyleSheet.create({
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
  eventsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  eventCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventHeaderLeft: {
    flex: 1,
  },
  dateText: {
    fontSize: FS.FS14,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH18,
    marginBottom: 4,
  },
  timeText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  rsvpBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rsvpBadgeText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    lineHeight: LH.LH14,
  },
  title: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH22,
  },
  description: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  venueText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  rsvpCountText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
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
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  paidBadge: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  paidBadgeText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH14,
  },
  paymentReminder: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  paymentReminderText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.ORANGE_TEXT,
    lineHeight: LH.LH16,
  },
});

export default EventsListStyles;

