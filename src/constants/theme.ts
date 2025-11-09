import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from './index';

/**
 * Centralized Theme System - Based on Auth Pages Design
 *
 * This file contains reusable style patterns to ensure consistency
 * across all screens following the black & white minimal design.
 */

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  XXL: 24,
  XXXL: 32,
  HEADER_TOP: 44,
};

export const BORDER_RADIUS = {
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  ROUND: 100,
};

export const commonStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
    backgroundColor: COLORS.WHITE,
  },

  containerCentered: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Header Styles
  header: {
    alignItems: 'center',
    marginTop: SPACING.HEADER_TOP,
    marginBottom: SPACING.XXL,
  },

  headerWithBack: {
    marginTop: SPACING.LG,
    marginBottom: SPACING.XXL,
  },

  logo: {
    width: 50,
    height: 50,
  },

  // Title Styles
  titleContainer: {
    marginBottom: SPACING.XXL,
  },

  title: {
    fontSize: FS.FS22,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    textAlign: 'center',
    lineHeight: LH.LH28,
  },

  titleLeft: {
    fontSize: FS.FS22,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    lineHeight: LH.LH28,
  },

  subtitle: {
    fontSize: FS.FS12,
    fontFamily: FF[300],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: SPACING.SM,
    lineHeight: LH.LH16,
  },

  subtitleLeft: {
    fontSize: FS.FS12,
    fontFamily: FF[300],
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.SM,
    lineHeight: LH.LH16,
  },

  // Section Styles
  section: {
    marginBottom: SPACING.XXL,
  },

  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: SPACING.LG,
  },

  sectionSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.MD,
  },

  // Card Styles
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },

  cardElevated: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Input Styles
  inputContainer: {
    marginBottom: SPACING.LG,
  },

  inputLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
  },

  inputDescription: {
    fontSize: FS.FS12,
    fontFamily: FF[300],
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.SM,
  },

  // Button Styles
  buttonContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: SPACING.XL,
  },

  buttonContainerFixed: {
    alignItems: 'center',
    marginTop: SPACING.XXL,
    marginBottom: SPACING.XL,
  },

  // Text Styles
  bodyText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },

  bodyTextGrey: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },

  caption: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },

  link: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },

  // Error Styles
  errorContainer: {
    marginBottom: SPACING.LG,
  },

  errorText: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
  },

  // Badge Styles
  badge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },

  badgeText: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    textTransform: 'uppercase',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_GREY,
    marginVertical: SPACING.LG,
  },

  // Row Layouts
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.XXXL,
  },

  emptyText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: SPACING.LG,
  },

  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.LG,
  },
});

// Status Badge Styles
export const statusStyles = StyleSheet.create({
  // Pending - Orange
  pending: {
    backgroundColor: COLORS.ORANGE_BG,
    borderWidth: 1,
    borderColor: COLORS.ORANGE_BORDER,
  },
  pendingText: {
    color: COLORS.ORANGE_TEXT,
  },

  // Approved/Active - Blue
  approved: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  approvedText: {
    color: COLORS.OCEAN_BLUE_TEXT,
  },

  // Completed/Success - Green
  completed: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  completedText: {
    color: COLORS.GREEN_TEXT,
  },

  // Rejected/Error - Red
  rejected: {
    backgroundColor: '#FDECEA',
    borderWidth: 1,
    borderColor: '#F1AEA9',
  },
  rejectedText: {
    color: COLORS.ERROR_COLOR,
  },

  // Info - Light Blue
  info: {
    backgroundColor: COLORS.BLUE_BG,
    borderWidth: 1,
    borderColor: COLORS.BLUE_BORDER,
  },
  infoText: {
    color: COLORS.BLUE_TEXT,
  },
});
