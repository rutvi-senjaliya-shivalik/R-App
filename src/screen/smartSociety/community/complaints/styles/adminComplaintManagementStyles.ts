import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const AdminComplaintManagementStyles = StyleSheet.create({
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
  complaintsList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16,
  },
  complaintCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  complaintHeaderLeft: {
    flex: 1,
  },
  categoryBadge: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.LIGHT_BLUE,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  flatNo: {
    fontSize: FS.FS11,
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
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    marginBottom: 12,
  },
  complaintFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  footerLeft: {
    marginBottom: 12,
  },
  dateText: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH14,
    marginBottom: 4,
  },
  assignedText: {
    fontSize: FS.FS11,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  assignButton: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  assignButtonText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH16,
  },
  statusButton: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusButtonText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.WHITE,
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

export default AdminComplaintManagementStyles;

