import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { FF, FS } from '../../../constants/fonts';

const HeaderComponentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  leftSection: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 44,
  },
  backImg: {
    height: 24,
    width: 24,
  },
  backBtn: {
    padding: 10,
  },
  title: {
    color: COLORS.BLACK_TEXT,
    fontSize: FS.FS22,
    fontFamily: FF[500],
    marginTop: Platform.OS === 'android' ? 5 : undefined,
    textAlign: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_BLUE,
    marginLeft: 8,
  },
  languageText: {
    fontSize: FS.FS14 || 14,
    fontFamily: FF[500],
    color: COLORS.DARK_BLUE,
    marginRight: 5,
    fontWeight: '600',
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.DARK_BLUE,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    width: '80%',
    maxWidth: 300,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  modalTitle: {
    fontSize: FS.FS18 || 18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.BLACK_TEXT,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
  },
  modalOptionSelected: {
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  modalOptionText: {
    fontSize: FS.FS16 || 16,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
  },
  modalOptionTextSelected: {
    fontWeight: '600',
    color: COLORS.DARK_BLUE,
  },
  modalCheckmark: {
    fontSize: 18,
    color: COLORS.DARK_BLUE,
    fontWeight: 'bold',
  },
});

export default HeaderComponentStyles;
