import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const AddVisitorEntryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
    lineHeight: LH.LH20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  chipActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  chipText: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  chipTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.WHITE,
    lineHeight: LH.LH20,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
  },
  placeholderText: {
    color: COLORS.GREY_TEXT,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.BORDER_GREY,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  checkboxChecked: {
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    borderColor: COLORS.OCEAN_BLUE_TEXT,
  },
  checkmark: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[700],
    lineHeight: LH.LH18,
  },
  checkboxLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH20,
    flex: 1,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default AddVisitorEntryStyles;

