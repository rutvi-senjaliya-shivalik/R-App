import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const AdminAmenitiesManagementStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  filterTabActive: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  filterTabText: {
    fontSize: FS.FS11,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH14,
    textAlign: 'center',
  },
  filterTabTextActive: {
    color: COLORS.BLACK_TEXT,
    fontFamily: FF[600],
    fontSize: FS.FS11,
  },
  addButton: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.BLACK,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16,
  },
  amenityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  amenityImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  amenityCardContent: {
    padding: 16,
  },
  amenityCardHeader: {
    marginBottom: 8,
  },
  amenityTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  amenityName: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 1,
  },
  statusActive: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  statusInactive: {
    backgroundColor: COLORS.ORANGE_BG,
    borderColor: COLORS.ORANGE_BORDER,
  },
  statusText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    lineHeight: LH.LH14,
  },
  statusTextActive: {
    color: COLORS.GREEN_TEXT,
  },
  statusTextInactive: {
    color: COLORS.ORANGE_TEXT,
  },
  amenityDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH20,
  },
  amenityDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 16,
  },
  detailText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  amenityActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.BLACK,
    minWidth: 100,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: COLORS.BLACK,
  },
  toggleButton: {
    backgroundColor: COLORS.BLACK,
  },
  deleteButton: {
    backgroundColor: COLORS.BLACK,
  },
  actionButtonText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH16,
  },
  editButtonText: {
    color: COLORS.WHITE,
  },
  toggleButtonText: {
    color: COLORS.WHITE,
  },
  deleteButtonText: {
    color: COLORS.WHITE,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default AdminAmenitiesManagementStyles;

