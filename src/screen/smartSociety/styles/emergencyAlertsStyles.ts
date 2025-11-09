import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const EmergencyAlertsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  // Emergency Alert Button Section
  alertButtonSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  emergencyAlertButton: {
    backgroundColor: COLORS.ERROR_COLOR,
    borderRadius: 16,
    padding: 18,
    shadowColor: COLORS.ERROR_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  alertButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertButtonIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  alertButtonIcon: {
    width: 26,
    height: 26,
    tintColor: COLORS.WHITE,
  },
  alertButtonTextContainer: {
    flex: 1,
  },
  alertButtonTitle: {
    fontSize: FS.FS17,
    fontFamily: FF[700],
    color: COLORS.WHITE,
    lineHeight: LH.LH22,
    marginBottom: 3,
  },
  alertButtonSubtitle: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: LH.LH16,
  },
  // Emergency Numbers Section
  numbersSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 6,
    lineHeight: LH.LH24,
  },
  sectionSubtitle: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH18,
  },
  emergencyNumberCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  numberCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    justifyContent: 'space-between',
  },
  numberCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numberIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  numberIcon: {
    fontSize: 26,
  },
  numberInfo: {
    flex: 1,
  },
  numberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  numberName: {
    fontSize: FS.FS15,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    flex: 1,
  },
  numberDescription: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  callButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
  },
  callIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.GREEN_TEXT,
  },
  numberText: {
    fontSize: FS.FS15,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    marginBottom: 5,
  },
});

export default EmergencyAlertsStyles;

