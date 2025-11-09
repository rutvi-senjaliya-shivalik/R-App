import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const VehicleRegistrationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 6,
    lineHeight: LH.LH24,
  },
  headerSubtitle: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  typeChipActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  typeChipText: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  typeChipTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  vehiclesList: {
    paddingBottom: 10,
  },
  vehicleCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleNumber: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH22,
  },
  vehicleType: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.ERROR_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: FS.FS20,
    fontFamily: FF[400],
    color: COLORS.WHITE,
    lineHeight: LH.LH24,
  },
  vehicleDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: FS.FS13,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    width: 100,
    lineHeight: LH.LH18,
  },
  detailValue: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    flex: 1,
    lineHeight: LH.LH18,
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
  addButton: {
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});

export default VehicleRegistrationStyles;

