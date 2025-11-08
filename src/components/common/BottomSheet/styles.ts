import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

export const BottomSheetStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    minHeight: 500,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.BORDER_GREY,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sheetTitle: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH27,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 8,
  },
  singleButtonRow: {
    marginTop: 24,
    marginBottom: 8,
  },
  button: {
    flex: 1,
  },
  fullButton: {
    width: '100%',
  },
  negativeButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  negativeButtonText: {
    color: COLORS.BLACK_TEXT,
  },
});

