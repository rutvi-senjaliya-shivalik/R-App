import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const EventDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  eventImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  headerCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
  },
  title: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH28,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  dateTimeItem: {
    flex: 1,
  },
  dateTimeLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH16,
  },
  dateTimeValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  venueRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  venueLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH16,
  },
  venueValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH20,
  },
  description: {
    fontSize: FS.FS15,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
  },
  rsvpStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  statValue: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  rsvpButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rsvpButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  rsvpButtonActive: {
    borderWidth: 2,
  },
  rsvpButtonText: {
    fontSize: FS.FS13,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  attendeesList: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
  },
  attendeesText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  paymentRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH16,
  },
  paymentAmount: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH24,
  },
  paidBadge: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  paidBadgeText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.GREEN_TEXT,
    lineHeight: LH.LH16,
  },
  paymentCard: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  paymentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentCardTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH22,
  },
  paymentCardAmount: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH24,
  },
  paymentCardDescription: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH18,
  },
  payNowButton: {
    marginTop: 0,
  },
});

export default EventDetailStyles;

