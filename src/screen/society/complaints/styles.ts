import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

export const complaintsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    backgroundColor: COLORS.LIGHT_GREY || '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FS.FS11,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
  title: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
    marginBottom: 8,
  },
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
    marginBottom: 8,
  },
  date: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

