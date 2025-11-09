import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from '../../constants';

const serviceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  categoryContainer: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  categoryChip: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.XL,
    backgroundColor: COLORS.WHITE,
    marginRight: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  categoryChipActive: {
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
  },
  categoryChipText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  categoryChipTextActive: {
    color: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
    padding: SPACING.LG,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
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
    flex: 1,
  },
  categoryBadge: {
    fontSize: FS.FS10,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
    alignSelf: 'flex-start',
    marginBottom: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    textTransform: 'uppercase',
  },
  providerName: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK,
    marginBottom: SPACING.XS,
  },
  specialization: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: SPACING.XS,
  },
  availabilityBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
  },
  availabilityText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_GREY,
    marginVertical: SPACING.MD,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.SM,
  },
  infoLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    flex: 1,
  },
  infoValue: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'right',
  },
  ratingValue: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'right',
  },
  callButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.SM,
    alignItems: 'center',
    marginTop: SPACING.MD,
  },
  callButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[600],
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.LG,
  },
  emptyText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
});

export default serviceStyles;
