import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../../constants';

const complaintStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
  },
  listContentEmpty: {
    flex: 1,
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

  // Tab Container
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: 4,
    marginVertical: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
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

  // Complaint Card
  complaintCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.MD,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: SPACING.SM,
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: SPACING.MD,
  },
  titleSection: {
    flex: 1,
  },
  complaintTitle: {
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.XS,
  },
  categoryLabel: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
  },

  // Priority Badge
  priorityBadge: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },
  priorityUrgent: {
    backgroundColor: '#FFEBEE',
  },
  priorityHigh: {
    backgroundColor: '#FFF3E0',
  },
  priorityMedium: {
    backgroundColor: '#E3F2FD',
  },
  priorityLow: {
    backgroundColor: '#F1F8E9',
  },
  priorityText: {
    fontFamily: FF[700],
    fontSize: FS.FS10,
    letterSpacing: 0.5,
  },
  priorityTextUrgent: {
    color: '#C62828',
  },
  priorityTextHigh: {
    color: '#E65100',
  },
  priorityTextMedium: {
    color: '#1565C0',
  },
  priorityTextLow: {
    color: '#558B2F',
  },

  // Description
  description: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    lineHeight: 20,
    marginBottom: SPACING.MD,
  },

  // Meta Info
  metaInfo: {
    marginBottom: SPACING.MD,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.XS,
  },
  metaLabel: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },
  metaValue: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.BLACK_TEXT,
  },

  // Card Footer
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_GREY,
    paddingTop: SPACING.MD,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.MD,
    flexWrap: 'wrap',
  },

  // Status Badge
  statusBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    marginRight: SPACING.SM,
  },
  statusOpen: {
    backgroundColor: COLORS.ORANGE_BG,
  },
  statusInProgress: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
  },
  statusResolved: {
    backgroundColor: COLORS.LIGHT_GREEN,
  },
  statusClosed: {
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  statusText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    letterSpacing: 0.3,
  },
  statusTextOpen: {
    color: COLORS.ORANGE_TEXT,
  },
  statusTextInProgress: {
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  statusTextResolved: {
    color: COLORS.GREEN_TEXT,
  },
  statusTextClosed: {
    color: COLORS.GREY_TEXT,
  },

  // Escalation Badge
  escalationBadge: {
    backgroundColor: COLORS.ORANGE_BG,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },
  escalationText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    color: COLORS.ERROR_COLOR,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.BLACK,
    borderRadius: BORDER_RADIUS.SM,
    marginLeft: SPACING.SM,
  },
  viewButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: COLORS.WHITE,
  },
  deleteButton: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginLeft: SPACING.SM,
  },
  deleteButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: COLORS.ERROR_COLOR,
  },

  // FAB Button
  fabButton: {
    position: 'absolute',
    right: SPACING.XL,
    bottom: SPACING.XL,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: COLORS.WHITE,
    fontFamily: FF[300],
  },
});

export default complaintStyles;
