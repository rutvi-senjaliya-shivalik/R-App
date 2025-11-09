import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const SocietyRulesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  categoryScroll: {
    maxHeight: 60,
    marginTop: 16,
  },
  categoryScrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  categoryChipActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  categoryChipText: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  categoryChipTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  rulesList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    gap: 16,
  },
  ruleCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
  },
  ruleHeader: {
    marginBottom: 12,
  },
  ruleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBadge: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  lastUpdated: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH14,
  },
  ruleTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH22,
  },
  ruleContent: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
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
});

export default SocietyRulesStyles;

