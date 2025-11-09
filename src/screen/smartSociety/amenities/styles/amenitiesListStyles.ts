import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const AmenitiesListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  amenityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    overflow: 'hidden',
  },
  amenityImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  amenityImagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityImagePlaceholderText: {
    fontSize: FS.FS48,
    fontFamily: FF[700],
    color: COLORS.GREY_TEXT,
  },
  amenityCardContent: {
    padding: 16,
  },
  amenityName: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  amenityDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH20,
  },
  amenityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
});

export default AmenitiesListStyles;

