import { StyleSheet } from "react-native";
import { COLORS, FF, FS, LH, SPACING, BORDER_RADIUS } from "../../../constants";

const ProfileSettingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.XXL,
    paddingHorizontal: 0,
  },
  section: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: SPACING.LG,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.MD,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  menuText: {
    fontFamily: FF[500],
    fontSize: FS.FS15,
    color: COLORS.BLACK,
    lineHeight: LH.LH20,
  },
  chevron: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: COLORS.GREY_TEXT,
    transform: [{ rotate: '180deg' }],
  },
  actionSection: {
    width: '90%',
    alignSelf: 'center',
    marginTop: SPACING.XL,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  sectionWithMarginTop: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: SPACING.LG,
    marginTop: SPACING.LG,
  },
});

export default ProfileSettingStyles;
