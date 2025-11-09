import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const MemberDirectoryStyles = StyleSheet.create({
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
  // Member Card
  memberCard: {
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
    flexDirection: 'row',
    padding: 16,
  },
  // Member Image
  memberImageContainer: {
    marginRight: 16,
  },
  memberImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  memberImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  memberInitials: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  // Member Info
  memberInfo: {
    flex: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberName: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
    flex: 1,
  },
  roleBadge: {
    backgroundColor: COLORS.LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  roleBadgeOwner: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  roleBadgeText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.GREEN_TEXT,
  },
  roleBadgeTextOwner: {
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  memberDetails: {
    gap: 6,
  },
  memberDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberDetailLabel: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    width: 60,
    lineHeight: LH.LH18,
  },
  memberDetailValue: {
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
});

export default MemberDirectoryStyles;

