import { StyleSheet } from "react-native";
import { COLORS, FS, FF, SPACING, BORDER_RADIUS } from "../../../constants";

const AddProjectLeadStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: SPACING.XL,
        paddingTop: SPACING.XXL,
    },

    // Tab Styles
    tabContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.XXXL,
        backgroundColor: COLORS.WHITE,
        borderRadius: BORDER_RADIUS.SM,
        padding: SPACING.XS,
        borderWidth: 1,
        borderColor: COLORS.BORDER_GREY,
    },
    tab: {
        flex: 1,
        paddingVertical: SPACING.MD,
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.SM,
    },
    activeTab: {
        backgroundColor: COLORS.BLACK,
    },
    tabText: {
        fontSize: FS.FS14,
        fontFamily: FF[500],
        color: COLORS.GREY_TEXT,
    },
    activeTabText: {
        color: COLORS.WHITE,
        fontFamily: FF[600],
    },

    // Form Styles
    inputContainer: {
        marginBottom: SPACING.XXL,
    },

    // Radio Button Styles
    radioContainer: {
        marginBottom: SPACING.XXL,
    },
    radioLabel: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        marginBottom: SPACING.LG,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.XXXL,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: BORDER_RADIUS.ROUND,
        borderWidth: 2,
        borderColor: COLORS.BORDER_GREY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.SM,
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: BORDER_RADIUS.ROUND,
        backgroundColor: COLORS.BLACK_TEXT,
    },
    radioText: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.BLACK_TEXT,
    },

    // Button Styles
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.XL,
        paddingBottom: SPACING.XL,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
    },
    step2ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.LG,
    },
    backButton: {
        paddingVertical: SPACING.MD,
        paddingHorizontal: SPACING.XXL,
        borderWidth: 1,
        borderColor: COLORS.BORDER_GREY,
        borderRadius: BORDER_RADIUS.SM,
        marginRight: SPACING.MD,
    },
    backButtonText: {
        fontSize: FS.FS16,
        fontFamily: FF[500],
        color: COLORS.BLACK_TEXT,
    },
    submitButtonWrapper: {
        flex: 1,
    },
    disclaimer: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        textAlign: 'center',
        lineHeight: SPACING.LG,
        marginTop: SPACING.LG,
    },

    // Error Text Styles
    errorText: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.ERROR_COLOR,
        marginTop: SPACING.XS,
        marginLeft: SPACING.XS,
    },
});

export default AddProjectLeadStyles;