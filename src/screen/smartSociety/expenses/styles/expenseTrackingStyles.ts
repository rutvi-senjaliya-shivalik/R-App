import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../../constants';

const ExpenseTrackingStyles = StyleSheet.create({
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
  summaryCard: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
    marginBottom: 8,
    lineHeight: LH.LH18,
  },
  summaryAmount: {
    fontSize: FS.FS28,
    fontFamily: FF[700],
    color: COLORS.OCEAN_BLUE_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH34,
  },
  summaryCount: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH16,
  },
  addButton: {
    backgroundColor: COLORS.OCEAN_BLUE_TEXT,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
    lineHeight: LH.LH18,
  },
  formContainer: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH20,
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
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  categoryChipActive: {
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
  },
  categoryChipText: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH16,
  },
  categoryChipTextActive: {
    color: COLORS.OCEAN_BLUE_TEXT,
    fontFamily: FF[600],
  },
  buttonContainer: {
    marginTop: 8,
  },
  listContainer: {
    marginTop: 10,
  },
  listTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 16,
    lineHeight: LH.LH22,
  },
  expensesList: {
    gap: 12,
  },
  expenseCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  expenseHeaderLeft: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH20,
  },
  expenseCategory: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
    lineHeight: LH.LH16,
  },
  expenseAmount: {
    fontSize: FS.FS18,
    fontFamily: FF[700],
    color: COLORS.BLACK_TEXT,
    lineHeight: LH.LH22,
  },
  expenseVendor: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH18,
  },
  expenseNotes: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
    lineHeight: LH.LH16,
  },
  expenseDate: {
    fontSize: FS.FS11,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: LH.LH14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    lineHeight: LH.LH20,
  },
});

export default ExpenseTrackingStyles;

