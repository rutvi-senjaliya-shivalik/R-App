import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const EditProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH22,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH20,
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
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  typeChipActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  typeChipText: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH18,
  },
  typeChipTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  saveButton: {
    marginTop: 24,
  },
});

export default EditProfileStyles;

