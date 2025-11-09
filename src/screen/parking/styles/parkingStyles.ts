import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../../constants';

const ParkingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    padding: 4,
    marginVertical: SPACING.LG,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.MD,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.SM,
  },
  activeTab: {
    backgroundColor: COLORS.BLACK,
  },
  tabText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },
  activeTabText: {
    color: COLORS.WHITE,
    fontFamily: FF[600],
  },
  passCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.MD,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleNumber: {
    fontFamily: FF[700],
    fontSize: FS.FS18,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.XS,
  },
  vehicleDetails: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },
  vehicleIcon: {
    fontSize: 32,
    marginLeft: SPACING.MD,
  },
  passDetails: {
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
    paddingTop: SPACING.MD,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: SPACING.SM,
  },
  detailLabel: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    width: 100,
  },
  detailValue: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.BLACK_TEXT,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
  },
  statusActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  statusExpired: {
    backgroundColor: '#FDECEA',
    borderColor: '#F1AEA9',
  },
  statusSuspended: {
    backgroundColor: COLORS.ORANGE_BG,
    borderColor: COLORS.ORANGE_BORDER,
  },
  statusText: {
    fontFamily: FF[600],
    fontSize: FS.FS12,
  },
  statusTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  statusTextExpired: {
    color: COLORS.ERROR_COLOR,
  },
  statusTextSuspended: {
    color: COLORS.ORANGE_TEXT,
  },
  passTypeBadge: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    marginTop: SPACING.XS,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  permanentBadge: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  temporaryBadge: {
    backgroundColor: COLORS.YELLOW_BG,
    borderColor: COLORS.YELLOW_BORDER,
  },
  passTypeText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
  },
  permanentText: {
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  temporaryText: {
    color: COLORS.ORANGE_TEXT,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: SPACING.MD,
    gap: SPACING.SM,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
    borderWidth: 1,
  },
  viewButton: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BLACK,
  },
  viewButtonText: {
    color: COLORS.BLACK,
    fontFamily: FF[600],
    fontSize: FS.FS14,
  },
  deleteButton: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.ERROR_COLOR,
  },
  deleteButtonText: {
    color: COLORS.ERROR_COLOR,
    fontFamily: FF[600],
    fontSize: FS.FS14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.XXXL * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.LG,
  },
  emptyText: {
    fontFamily: FF[500],
    fontSize: FS.FS16,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  emptySubText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: SPACING.SM,
  },
  fabButton: {
    position: 'absolute',
    right: SPACING.XL,
    bottom: SPACING.XL,
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.ROUND,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: COLORS.WHITE,
  },
  listContentEmpty: {
    flex: 1,
  },
  // Form Styles
  formContainer: {
    padding: SPACING.LG,
  },
  inputGroup: {
    marginBottom: SPACING.XL,
  },
  label: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.SM,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    fontFamily: FF[400],
    fontSize: FS.FS15,
    color: COLORS.BLACK_TEXT,
  },
  pickerButton: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    fontFamily: FF[400],
    fontSize: FS.FS15,
    color: COLORS.BLACK_TEXT,
  },
  pickerPlaceholder: {
    color: COLORS.GREY_TEXT,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  radioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    backgroundColor: COLORS.WHITE,
  },
  radioButtonSelected: {
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 2,
    borderColor: COLORS.GREY_TEXT,
    marginRight: SPACING.SM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: COLORS.BLACK,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: BORDER_RADIUS.ROUND,
    backgroundColor: COLORS.BLACK,
  },
  radioLabel: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
  },
  submitButton: {
    backgroundColor: COLORS.BLACK,
    borderRadius: BORDER_RADIUS.SM,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginTop: SPACING.XL,
    marginBottom: SPACING.XL * 2,
  },
  submitButtonText: {
    color: COLORS.WHITE,
    fontFamily: FF[600],
    fontSize: FS.FS16,
  },
  // Details Screen
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  detailsHeader: {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.XL,
    borderBottomLeftRadius: BORDER_RADIUS.XL,
    borderBottomRightRadius: BORDER_RADIUS.XL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  detailsVehicleNumber: {
    fontFamily: FF[700],
    fontSize: FS.FS24,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.SM,
  },
  detailsVehicleInfo: {
    fontFamily: FF[400],
    fontSize: FS.FS16,
    color: COLORS.GREY_TEXT,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: SPACING.MD,
    gap: SPACING.SM,
  },
  qrSection: {
    backgroundColor: COLORS.WHITE,
    margin: SPACING.LG,
    padding: SPACING.XL,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    alignItems: 'center',
  },
  qrText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: SPACING.LG,
  },
  qrSubText: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: SPACING.XS,
  },
  infoSection: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: SPACING.LG,
    padding: SPACING.XL,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.LG,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    width: 120,
  },
  infoValue: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
    flex: 1,
  },
  actionSection: {
    marginHorizontal: SPACING.LG,
    marginBottom: SPACING.XL,
  },
  primaryButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  primaryButtonText: {
    color: COLORS.WHITE,
    fontFamily: FF[600],
    fontSize: FS.FS16,
  },
  secondaryButton: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ERROR_COLOR,
  },
  secondaryButtonText: {
    color: COLORS.ERROR_COLOR,
    fontFamily: FF[600],
    fontSize: FS.FS16,
  },
});

export default ParkingStyles;
