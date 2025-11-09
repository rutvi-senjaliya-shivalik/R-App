import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const MarkVisitorExitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  // Search Section
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  // List Section
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH22,
  },
  listContent: {
    paddingBottom: 20,
  },
  visitorItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  visitorItemSelected: {
    borderColor: COLORS.OCEAN_BLUE_TEXT,
    borderWidth: 2,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
  },
  visitorItemContent: {
    padding: 16,
  },
  visitorItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  visitorImageContainer: {
    marginRight: 12,
  },
  visitorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  visitorImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  visitorInitials: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  visitorName: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
  },
  selectedBadge: {
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedBadgeText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  visitorDetails: {
    gap: 8,
  },
  visitorDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorDetailLabel: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    width: 80,
    lineHeight: LH.LH18,
  },
  visitorDetailValue: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    flex: 1,
    lineHeight: LH.LH18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  // Details Section
  detailsSection: {
    flex: 1,
  },
  detailsContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  // Card Styles
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.OCEAN_BLUE_BORDER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: FS.FS15,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH20,
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeButtonText: {
    fontSize: FS.FS13,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  visitorImageSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  visitorDetailImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  visitorDetailImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  visitorDetailInitials: {
    fontSize: FS.FS28,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  detailLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  detailValue: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    flex: 1,
    textAlign: 'right',
  },
  // Button Container
  buttonContainer: {
    marginTop: 12,
    marginBottom: 20,
  },
});

export default MarkVisitorExitStyles;

