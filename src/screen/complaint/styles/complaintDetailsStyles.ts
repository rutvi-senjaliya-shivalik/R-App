import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../../constants';

const complaintDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
  },

  // Empty State
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

  // Header Section
  headerSection: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginTop: SPACING.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  iconTitleRow: {
    flexDirection: 'row',
    marginBottom: SPACING.MD,
  },
  categoryIconLarge: {
    fontSize: 48,
    marginRight: SPACING.LG,
  },
  titleColumn: {
    flex: 1,
  },
  complaintTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS20,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.XS,
  },
  categoryText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.SM,
  },
  priorityBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    marginRight: SPACING.SM,
    marginBottom: SPACING.SM,
  },
  priorityText: {
    fontFamily: FF[700],
    fontSize: FS.FS11,
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    marginBottom: SPACING.SM,
  },
  statusText: {
    fontFamily: FF[700],
    fontSize: FS.FS11,
    letterSpacing: 0.5,
  },
  escalationWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ORANGE_BG,
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    marginTop: SPACING.MD,
  },
  escalationIcon: {
    fontSize: 20,
    marginRight: SPACING.SM,
  },
  escalationText: {
    flex: 1,
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: COLORS.ERROR_COLOR,
  },

  // Section
  section: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  sectionTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.MD,
  },
  descriptionText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    lineHeight: 22,
  },

  // Timeline
  timelineContainer: {
    paddingLeft: SPACING.SM,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.XL,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.ORANGE_TEXT,
    marginRight: SPACING.LG,
    marginTop: SPACING.XS,
  },
  timelineDotBlue: {
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
  },
  timelineDotGreen: {
    backgroundColor: COLORS.GREEN_TEXT,
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.XS,
  },
  timelineDate: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    marginBottom: 2,
  },
  timelineSubtext: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
  },

  // Resolution
  resolutionCard: {
    backgroundColor: COLORS.LIGHT_GREEN,
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.GREEN_TEXT,
  },
  resolutionText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREEN_TEXT,
    lineHeight: 20,
  },

  // Attachments
  attachmentsContainer: {
    flexDirection: 'column',
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginBottom: SPACING.SM,
  },
  attachmentIcon: {
    fontSize: 20,
    marginRight: SPACING.MD,
  },
  attachmentText: {
    flex: 1,
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.BLACK_TEXT,
  },

  // Action Section
  actionSection: {
    marginTop: SPACING.SM,
    marginBottom: SPACING.MD,
  },
  changeStatusButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  changeStatusButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS15,
    color: COLORS.WHITE,
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: SPACING.XL,
  },
});

export default complaintDetailsStyles;
