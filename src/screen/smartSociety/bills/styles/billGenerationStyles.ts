import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const BillGenerationStyles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH22,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: FS.FS13,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH18,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    backgroundColor: COLORS.WHITE,
    lineHeight: LH.LH20,
  },
  totalContainer: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  totalLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH18,
  },
  totalAmount: {
    fontSize: FS.FS24,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH30,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default BillGenerationStyles;

