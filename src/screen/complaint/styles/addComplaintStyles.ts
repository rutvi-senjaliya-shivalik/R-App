import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../../constants';

const addComplaintStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
  },

  // Section
  section: {
    marginTop: SPACING.LG,
  },
  sectionTitle: {
    fontFamily: FF[600],
    fontSize: FS.FS15,
    color: COLORS.BLACK_TEXT,
    marginBottom: SPACING.MD,
  },
  required: {
    color: COLORS.ERROR_COLOR,
  },

  // Category Selection
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.MD,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.BORDER_GREY,
  },
  categoryCardActive: {
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  categoryLabel: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  categoryLabelActive: {
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },

  // Priority Selection
  priorityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  priorityChip: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.XL,
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: COLORS.BORDER_GREY,
    margin: 4,
  },
  priorityText: {
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },

  // Input Fields
  input: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  textArea: {
    minHeight: 120,
    paddingTop: SPACING.LG,
  },
  charCount: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.XS,
    textAlign: 'right',
  },

  // Info Box
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    marginTop: SPACING.LG,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.OCEAN_BLUE_TEXT,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: SPACING.MD,
  },
  infoText: {
    flex: 1,
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: 19,
  },

  // Submit Button
  submitButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    marginTop: SPACING.XXL,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.GREY_TEXT,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.WHITE,
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: SPACING.XXL,
  },
});

export default addComplaintStyles;
