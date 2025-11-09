import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const RoleSelectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  headerImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2.5,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  headerImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: LH.LH30,
  },
  headerSubtitle: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: LH.LH18,
    marginTop: 8,
  },
  rolesContainer: {
    gap: 16,
  },
  roleCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
  },
  roleCardSpacing: {
    marginBottom: 16,
  },
  roleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  roleIcon: {
    fontSize: 32,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH22,
  },
  roleSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH20,
  },
  roleDescription: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrowText: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH24,
  },
});

export default RoleSelectionStyles;
