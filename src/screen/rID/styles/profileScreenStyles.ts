import { StyleSheet } from "react-native";
import { COLORS, FF, FS, LH, BORDER_RADIUS, SPACING } from "../../../constants";

/**
 * Profile/rID Module Styles - Black & White Design System
 * Matches auth pages design with consistent spacing, borders, and typography
 */

const ProfileScreenStyles = StyleSheet.create({
    // Main Container Styles
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },

    mainContainer: {
        backgroundColor: COLORS.WHITE,
        flex: 1,
        paddingHorizontal: 0,
    },

    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },

    // Personal Details Styles
    personalDetailsContainer: {
        paddingHorizontal: SPACING.XL, // 20px
        zIndex: 999999,
        backgroundColor: COLORS.WHITE,
    },

    personalDetailsSection: {
        marginTop: SPACING.XL, // 20px
        backgroundColor: COLORS.WHITE,
    },

    inputWrapper: {
        marginTop: SPACING.LG, // 16px
    },

    firstInputWrapper: {
        // No margin top for first input
    },

    // Gender Selection Styles
    genderContainer: {
        marginTop: SPACING.LG, // 16px
    },

    genderLabel: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        lineHeight: LH.LH20,
    },

    genderOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.SM, // 8px
    },

    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    genderOptionFemale: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: SPACING.LG, // 16px
    },

    radioButton: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.BLACK,
        borderRadius: BORDER_RADIUS.ROUND, // 100
        alignItems: 'center',
        justifyContent: 'center',
    },

    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: BORDER_RADIUS.ROUND, // 100
        backgroundColor: COLORS.BLACK,
    },

    genderText: {
        marginLeft: SPACING.SM, // 8px
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.BLACK,
    },

    // Date Picker Styles
    dobContainer: {
        marginTop: SPACING.MD, // 12px
    },

    dobButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
    },

    dobText: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        lineHeight: LH.LH20,
    },

    calendarIcon: {
        width: 20,
        height: 20,
    },

    // Nationality Picker Styles
    nationalityContainer: {
        marginTop: SPACING.LG, // 16px
    },

    nationalityButton: {
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    nationalityText: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        lineHeight: LH.LH20,
    },

    nationalityTextSelected: {
        color: COLORS.BLACK,
    },

    nationalityTextPlaceholder: {
        color: COLORS.GREY_TEXT,
    },

    dropdownArrow: {
        fontSize: 12,
        color: COLORS.GREY_TEXT,
    },

    // Submit Button Styles - Black background matching auth pages
    submitButton: {
        marginTop: SPACING.LG, // 16px
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        alignSelf: 'center',
        paddingHorizontal: 50,
        backgroundColor: COLORS.BLACK,
        borderRadius: BORDER_RADIUS.SM, // 8px
    },

    submitButtonText: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.WHITE,
    },

    // Profile Image Styles
    profileImageSection: {
        alignItems: 'center',
        paddingVertical: SPACING.XL, // 20px
        backgroundColor: COLORS.WHITE,
    },

    profileImageContainer: {
        position: 'relative',
    },

    profileImageWrapper: {
        width: 120,
        height: 120,
        borderRadius: BORDER_RADIUS.ROUND, // 100 (60 for this size)
        backgroundColor: COLORS.LIGHT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.BORDER_GREY,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: BORDER_RADIUS.ROUND, // 100 (60 for this size)
    },

    profileImageDefault: {
        width: 80,
        height: 80,
    },

    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: BORDER_RADIUS.ROUND, // 100 (18 for this size)
        backgroundColor: COLORS.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.BORDER_GREY,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    cameraIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.WHITE,
    },

    // Section Header Styles (Accordion)
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: SPACING.XL, // 20px
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
        backgroundColor: COLORS.WHITE,
    },

    sectionHeaderText: {
        fontSize: FS.FS15,
        fontFamily: FF[500],
        color: COLORS.BLACK,
    },

    sectionHeaderArrow: {
        fontSize: 18,
        color: COLORS.BLACK,
    },

    // Country Picker Modal Styles
    countryPickerModal: {
        height: "80%",
        backgroundColor: COLORS.WHITE,
    },

    // Loading State Styles
    loadingContainer: {
        padding: SPACING.XL, // 20px
        alignItems: 'center',
    },

    loadingText: {
        color: COLORS.GREY_TEXT,
        fontSize: FS.FS16,
    },

    // Dropdown Loading Styles
    dropdownLoadingContainer: {
        padding: 15,
        alignItems: 'center',
    },

    dropdownLoadingText: {
        color: COLORS.GREY_TEXT,
        fontSize: FS.FS14,
        fontFamily: FF[400],
    },

    // Property Search Dropdown Styles
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
        paddingVertical: 14,
    },

    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchInputInner: {
        flex: 1,
        position: 'relative',
    },

    searchInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchClearButton: {
        padding: 5,
        marginLeft: 10,
    },

    searchClearText: {
        fontSize: 18,
        color: COLORS.GREY_TEXT,
    },

    searchResultsDropdown: {
        marginTop: 10,
        backgroundColor: COLORS.WHITE,
        borderRadius: BORDER_RADIUS.SM, // 8px
        zIndex: 1000,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
        borderWidth: 1,
        borderColor: COLORS.BORDER_GREY,
    },

    searchResultsScrollView: {
        maxHeight: 200,
    },

    searchResultItem: {
        padding: 15,
    },

    searchResultItemBordered: {
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.BORDER_GREY,
    },

    searchResultText: {
        color: COLORS.BLACK,
        fontSize: FS.FS16,
        fontFamily: FF[400],
    },

    // Company Mobile Number Input Styles
    companyPhoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    companyPhonePrefix: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
        paddingVertical: 14,
        paddingRight: 10,
    },

    companyPhonePrefixText: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
    },

    companyPhoneInputWrapper: {
        flex: 1,
        marginLeft: 10,
    },

    // Inline Container Styles (for consistent padding)
    inlinePaddingHorizontal: {
        paddingHorizontal: 10,
    },
});

export default ProfileScreenStyles;