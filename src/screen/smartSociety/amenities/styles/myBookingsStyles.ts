import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const MyBookingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  filterTabActive: {
    backgroundColor: COLORS.DARK_BLUE,
  },
  filterTabText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  filterTabTextActive: {
    color: COLORS.WHITE,
    fontFamily: FF[600],
  },
  listContent: {
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amenityName: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
  },
  bookingDetails: {
    gap: 8,
  },
  detailText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#FFEBEE',
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: '#C62828',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
});

export default MyBookingsStyles;

