import { StyleSheet } from "react-native";
import { COLORS, FF, FS, LH, SPACING, BORDER_RADIUS } from "../../../constants";

const DeskStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SPACING.XL,
  },
  borderContainer: {
    borderRadius: BORDER_RADIUS.LG,
    opacity: 0.8,
    overflow: 'hidden',
  },
  innerContainer: {
    borderRadius: BORDER_RADIUS.MD,
    padding: 2,
    overflow: 'hidden',
  },
  projectTag: {
    backgroundColor: COLORS.LIGHT_GREEN,
    color: COLORS.GREEN_TEXT,
    paddingHorizontal: SPACING.SM,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.SM,
    fontSize: FS.FS12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
  },
  name: {
    marginTop: SPACING.MD,
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  phone: {
    fontSize: FS.FS18,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: SPACING.SM,
  },
  icons: {
    flexDirection: 'row',
    marginBottom: SPACING.SM,
  },
  item: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  // Project Lead Card Styles
  projectLeadCard: {
    marginTop: SPACING.LG,
    padding: SPACING.LG,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.LG,
    borderColor: COLORS.BORDER_GREY,
    backgroundColor: COLORS.WHITE,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: SPACING.SM,
    alignItems: 'center',
  },
  projectTagStyle: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    borderWidth: 1,
  },
  hotTagStyle: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 1,
  },
  projectTagText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  hotTagText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    paddingVertical: SPACING.XS,
  },
  itemWithMargin: {
    marginTop: SPACING.SM,
  },
  nameWithMargin: {
    marginTop: SPACING.SM,
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1000,
  },
  headerRightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1000,
  },
  dropdownButton: {
    paddingHorizontal: 10,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
  },
  // Search and Button Styles
  searchContainer: {
    marginTop: SPACING.SM,
  },
  buttonContainer: {
    marginTop: SPACING.XL,
  },
  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.XXXL,
  },
  loadingText: {
    marginTop: SPACING.SM,
    fontSize: FS.FS16,
    fontFamily: FF[400],
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
  },
  noDataText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  // FlatList Styles
  flatListContainer: {
    paddingBottom: SPACING.XL,
  },
  totalLeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end',
  },
  totalLeadText: {
    fontSize: FS.FS16,
    color: COLORS.BLACK,
    fontFamily: FF[400],
    lineHeight:LH.LH24,
  },
  totalLeadValue: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  addImg: {
    height: 30,
    width: 30
},
menuOptions: {
    width: 200,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    padding: SPACING.XS,
    position: 'absolute',
    zIndex: 1000,
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 40,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.SM,
  },
  userDeleteTxt: {
    fontSize: FS.FS14,
    color: COLORS.ERROR_COLOR,
    fontFamily: FF[400],
    paddingHorizontal: SPACING.LG,
    paddingVertical: 2,
    marginTop: SPACING.XS,
  },
  // Land Card Styles
  landTagStyle: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: COLORS.LIGHT_BLUE,
    borderColor: COLORS.BLUE_TEXT,
    borderWidth: 1,
  },
  landTagText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.BLUE_TEXT,
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.SM,
  },
  contactIcons: {
    flexDirection: 'row',
    gap: SPACING.SM,
  },
  whatsappIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: COLORS.GREEN_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: COLORS.LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  landInfoItem: {
    flex: 1,
  },
});

export default DeskStyles;