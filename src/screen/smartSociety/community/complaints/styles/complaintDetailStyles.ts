import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../../constants';

const ComplaintDetailStyles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    marginTop: 16,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  categoryBadge: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.LIGHT_BLUE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  flatNo: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  statusIcon: {
    fontSize: FS.FS14,
  },
  statusText: {
    fontSize: FS.FS12,
    fontFamily: FF[600],
    lineHeight: LH.LH16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH20,
  },
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  attachedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  timelineLabel: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  timelineValue: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH18,
  },
  feedbackCard: {
    backgroundColor: COLORS.LIGHT_GREEN,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_BORDER_GREEN,
  },
  feedbackText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREEN_TEXT,
    lineHeight: LH.LH20,
  },
  feedbackButton: {
    marginTop: 8,
  },
});

export default ComplaintDetailStyles;

