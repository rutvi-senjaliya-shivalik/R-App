import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const AmenityDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  amenityImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  amenityImagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityImagePlaceholderText: {
    fontSize: FS.FS64,
    fontFamily: FF[700],
    color: COLORS.GREY_TEXT,
  },
  detailsCard: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 20,
    lineHeight: LH.LH20,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
  },
  rulesCard: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  ruleBullet: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.DARK_BLUE,
    marginRight: 8,
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  bookButton: {
    paddingHorizontal: 16,
    marginTop: 24,
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
  emptyText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
});

export default AmenityDetailStyles;

