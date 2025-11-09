import { StyleSheet } from 'react-native';
import { COLORS, FS, LH, FF } from '../../../constants';

export const lostAndFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: 16,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  addButton: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100, // Extra padding to avoid overlap with bottom button
  },
  emptyListContent: {
    flexGrow: 1,
  },
  entryCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  entryContent: {
    flex: 1,
    paddingRight: 12,
  },
  entryDescription: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  entryTimestamp: {
    fontSize: FS.FS12,
    lineHeight: LH.LH16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  entryThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: FS.FS32 * 2,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: FS.FS18,
    lineHeight: LH.LH24,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
});
