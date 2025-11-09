import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';
import { SPACING, BORDER_RADIUS } from '../../../constants/theme';

const ContactStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SPACING.XL,
  },
  searchContainer: {
    marginTop: SPACING.LG,
  },
  contactSyncContainer: {
    marginTop: SPACING.LG,
  },
  contactCardContainer: {
    marginTop: SPACING.LG,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: SPACING.LG,
  },
  sectionHeaderText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
  },
  contactItem: {
    padding: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    flexDirection: 'row',
    marginTop: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.WHITE,
  },
  contactAvatar: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: BORDER_RADIUS.ROUND,
    padding: SPACING.SM,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarText: {
    fontSize: FS.FS24,
    color: COLORS.BLACK_TEXT,
    fontFamily: FF[600],
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingLeft: SPACING.MD,
  },
  contactName: {
    fontSize: FS.FS18,
    fontFamily: FF[500],
    color: COLORS.BLACK,
  },
  contactStatus: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
  },
  registeredStatus: {
    color: COLORS.BLACK_TEXT,
  },
  inviteStatus: {
    color: COLORS.IOS_BLUE,
  },
  addContactStatus: {
    color: COLORS.IOS_BLUE,
  },
  bottomPadding: {
    height: SPACING.XL,
  },
  flatListFooter: {
    height: SPACING.LG,
  },
  inviteButton: {
    flex: 0.2,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.SM,
    borderRadius: BORDER_RADIUS.SM,
    backgroundColor: COLORS.IOS_BLUE + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.IOS_BLUE,
    textAlign: 'center',
  },
  inviteButtonPressed: {
    backgroundColor: COLORS.IOS_BLUE + '20',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.LG,
    marginTop: SPACING.SM,
  },
  bulkInviteButton: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.XL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulkInviteButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
});

export default ContactStyles;
