import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH, SPACING, BORDER_RADIUS } from '../../../constants';

/**
 * Premium Home Screen Styles - Black & White Design
 * Highly professional, minimal, and elegant
 */

const HomeStyles = StyleSheet.create({
  // Scroll Container
  scrollContent: {
    paddingBottom: SPACING.XXXL,
  },

  // Loading & Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.XXXL * 2,
  },

  loadingText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.LG,
    lineHeight: LH.LH20,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.XXXL * 2,
  },

  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    lineHeight: LH.LH24,
    marginBottom: SPACING.XL,
  },

  retryButton: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.XXL,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
  },

  retryButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH20,
  },

  // Premium Header Section
  header: {
    paddingTop: SPACING.XXXL + SPACING.MD, // 44px
    paddingBottom: SPACING.XXL,
    paddingHorizontal: SPACING.XL,
  },

  greeting: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
    marginBottom: SPACING.XS,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },

  userName: {
    fontSize: FS.FS28,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    lineHeight: LH.LH36,
  },

  committeeBadge: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
    marginLeft: SPACING.MD,
  },

  committeeBadgeText: {
    fontSize: FS.FS10,
    fontFamily: FF[700],
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  unitInfo: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },

  // Stats Section - Premium Cards
  statsSection: {
    paddingHorizontal: SPACING.XL,
    marginBottom: SPACING.XXL,
  },

  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    lineHeight: LH.LH24,
    marginBottom: SPACING.LG,
  },

  statsGrid: {
    gap: SPACING.MD,
  },

  statCard: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.XL,
    marginBottom: SPACING.MD,
  },

  statCardAlert: {
    borderColor: COLORS.BLACK,
    borderWidth: 2,
  },

  statLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: LH.LH16,
    marginBottom: SPACING.SM,
  },

  statValue: {
    fontSize: FS.FS32,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    lineHeight: LH.LH36,
    marginBottom: SPACING.XS,
  },

  statValueAlert: {
    color: COLORS.BLACK,
  },

  statSubtext: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },

  alertIndicator: {
    marginTop: SPACING.SM,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },

  alertIndicatorText: {
    fontSize: FS.FS10,
    fontFamily: FF[700],
    color: COLORS.WHITE,
    letterSpacing: 0.5,
  },

  // Notice Section - Premium Design
  noticeSection: {
    paddingHorizontal: SPACING.XL,
    marginBottom: SPACING.XXL,
  },

  noticeSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },

  seeAllLink: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },

  noticeCard: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.XL,
  },

  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
  },

  noticeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.ROUND,
    backgroundColor: COLORS.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noticeIcon: {
    fontSize: 20,
  },

  noticeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  noticeDate: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },

  noticeTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    lineHeight: LH.LH24,
    marginBottom: SPACING.SM,
  },

  noticeDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },

  // Quick Actions - Premium Grid
  actionsSection: {
    paddingHorizontal: SPACING.XL,
    marginBottom: SPACING.XXL,
  },

  actionsRow: {
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
  },

  actionCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.SM,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.XS,
  },

  actionIconEmoji: {
    fontSize: 24,
  },

  actionLabel: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    textAlign: 'center',
    lineHeight: LH.LH12,
  },
});

export default HomeStyles;
