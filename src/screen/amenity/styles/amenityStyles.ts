import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../../constants';

const amenityStyles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.MD,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.BLACK,
  },
  tabText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },
  activeTabText: {
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  tabBadge: {
    fontFamily: FF[700],
    fontSize: FS.FS12,
    color: COLORS.WHITE,
    backgroundColor: COLORS.ERROR_COLOR,
    paddingHorizontal: SPACING.XS + 2,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.SM + 2,
    overflow: 'hidden',
  },
  listContent: {
    padding: SPACING.XL,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.MD,
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },

  // Amenity Card Styles
  amenityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  amenityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.MD,
  },
  amenityIconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.ROUND,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  amenityIcon: {
    fontSize: 28,
  },
  amenityInfo: {
    flex: 1,
    marginRight: SPACING.SM,
  },
  amenityName: {
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.XS,
  },
  amenityDescription: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    lineHeight: 18,
  },
  availableBadge: {
    backgroundColor: COLORS.LIGHT_GREEN,
    paddingHorizontal: SPACING.SM + 2,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  availableText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    color: COLORS.GREEN_TEXT,
  },
  unavailableBadge: {
    backgroundColor: '#FDECEA',
    paddingHorizontal: SPACING.SM + 2,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: '#F1AEA9',
  },
  unavailableText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    color: COLORS.ERROR_COLOR,
  },
  amenityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.LG,
    paddingTop: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: SPACING.XS,
  },
  detailText: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
  },
  bookButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.WHITE,
  },

  // Booking Card Styles
  bookingCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.MD,
    paddingBottom: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  bookingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.ROUND,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  bookingIcon: {
    fontSize: 24,
  },
  bookingInfo: {
    flex: 1,
    marginRight: SPACING.SM,
  },
  bookingAmenityName: {
    fontFamily: FF[600],
    fontSize: FS.FS15,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.XS,
  },
  bookingDate: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    marginBottom: 2,
  },
  bookingTime: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },
  statusBadge: {
    paddingHorizontal: SPACING.SM + 2,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
    alignSelf: 'flex-start',
  },
  statusUpcoming: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  statusCompleted: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  statusCancelled: {
    backgroundColor: '#FDECEA',
    borderWidth: 1,
    borderColor: '#F1AEA9',
  },
  statusText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
  },
  bookingFooter: {
    gap: SPACING.SM,
  },
  bookingDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDetailLabel: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },
  bookingDetailValue: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.BLACK_TEXT,
  },
  bookingAmountValue: {
    fontFamily: FF[700],
    fontSize: FS.FS15,
    color: COLORS.BLACK,
  },

  // Empty State Styles
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
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.SM,
  },
  emptySubText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    paddingHorizontal: SPACING.XXXL,
  },
});

export default amenityStyles;
