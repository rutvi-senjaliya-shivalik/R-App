import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const LostFoundDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    lineHeight: LH.LH16,
  },
  itemName: {
    fontSize: FS.FS24,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH32,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    lineHeight: LH.LH16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH22,
  },
  itemImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: FS.FS16,
    marginRight: 8,
  },
  locationText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    flex: 1,
  },
  infoText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  contactButton: {
    flex: 1,
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  contactButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  messageButtonText: {
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  adminButton: {
    marginTop: 12,
  },
  deleteButton: {
    backgroundColor: COLORS.ERROR_COLOR,
  },
});

export default LostFoundDetailStyles;

