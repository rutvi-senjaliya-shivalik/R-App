import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { FF, FS, LH } from '../../../constants/fonts';

const SocietySelectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 20,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS24,
    fontFamily: FF[600],
    lineHeight: 28,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 20,
    lineHeight: LH.LH20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  societyCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  societyIconContainer: {
    marginRight: 16,
  },
  societyIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  societyIconText: {
    fontSize: FS.FS24,
  },
  societyInfo: {
    flex: 1,
  },
  societyName: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
  },
  societyLocation: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
  },
  societyDetails: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
});

export default SocietySelectionStyles;

