import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const AdminMemberManagementStyles = StyleSheet.create({
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
    marginBottom: 16,
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
  addButton: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  membersList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16,
  },
  memberCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberHeaderLeft: {
    flex: 1,
  },
  memberName: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
    marginBottom: 6,
  },
  memberInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  flatNo: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  wing: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  roleBadgeText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    lineHeight: LH.LH14,
  },
  memberDetails: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    marginRight: 8,
    minWidth: 100,
  },
  detailValue: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    flex: 1,
    lineHeight: LH.LH18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
  },
  editButtonText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH16,
  },
  deleteButton: {
    backgroundColor: COLORS.ERROR_COLOR,
  },
  deleteButtonText: {
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  modalTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH24,
  },
  modalClose: {
    fontSize: FS.FS24,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH28,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH18,
  },
  modalButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default AdminMemberManagementStyles;

