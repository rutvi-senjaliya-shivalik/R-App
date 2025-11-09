import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";
import { FS, LH, FF } from "../../../constants/fonts";

const Loginstyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    containers: {
        backgroundColor: '#F3F3F5',
        borderRadius: 33,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 31,
        height: '90%',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    header:{
        alignItems:'center',
        marginTop: 44,
        marginBottom: 24,
    },
    logo:{
        width: 50,
        height: 50
    },
    titleContainer:{
        marginBottom: 24,
    },
    // Title styles
    title: {
        fontSize: FS.FS22,
        fontFamily: FF[500],
        color: COLORS.BLACK,
        textAlign: 'center',
        lineHeight: LH.LH28,
    },
    // Input section styles
    inputSection: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: FS.FS12,
        fontFamily: FF[300],
        color: COLORS.BLACK,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: LH.LH16,
    },
    // Button container styles
    buttonContainer: {
        alignItems:'center',
        marginTop: 'auto',
        marginBottom: 20,
        alignSelf:'center'
    },

    termsContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 16,
    },
    termsText: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.BLACK,
        textAlign: 'center',
        lineHeight: LH.LH18,
    },
    linkText: {
        fontSize: FS.FS12,
        fontFamily: FF[600],
        color: COLORS.BLACK,
        fontWeight: 'bold',
    },
    inputContainer:{
      marginBottom: 16,
    },
    errorContainer: {
        marginBottom: 16,
        // paddingHorizontal: 20,
    },
    errorText: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.ERROR_COLOR,
        // textAlign: 'left',
    },
    // Quick Fill styles
    quickFillContainer: {
        marginTop: 16,
        marginBottom: 24,
        alignItems: 'center',
    },
    quickFillLabel: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        marginBottom: 12,
    },
    quickFillButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    quickFillButton: {
        backgroundColor: COLORS.LIGHT_BLUE,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 4,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: COLORS.BLUE_BORDER,
    },
    quickFillButtonText: {
        fontSize: FS.FS11,
        fontFamily: FF[500],
        color: COLORS.BLUE_TEXT,
    }
});

export default Loginstyles;