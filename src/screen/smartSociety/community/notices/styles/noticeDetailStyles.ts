import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const NoticeDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
    marginTop: 16,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    color: COLORS.OCEAN_BLUE_TEXT,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    lineHeight: LH.LH16,
  },
  title: {
    fontSize: FS.FS20,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH24,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontSize: FS.FS15,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  infoLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH20,
  },
  infoValue: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
});

export default NoticeDetailStyles;

