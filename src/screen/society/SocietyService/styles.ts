import { StyleSheet } from 'react-native';
import { COLORS, FS, LH, FF } from '../../../constants';

export const societyServiceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  gridContent: {
    paddingBottom: 24,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: FS.FS14,
    lineHeight: LH.LH20,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    textAlign: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 60,
    height: 60,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  aiVoiceStyle: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
  },
});
