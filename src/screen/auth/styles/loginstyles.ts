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
        marginTop: 60,
        marginBottom: 40,
    },
    logo:{
        width: 50,
        height: 50
    },
    logoLarge: {
        width: 200,
        height: 80,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 40,
    },
    titleContainer:{
        marginTop: 80,
        marginBottom: 32,
    },
    // Title styles
    title: {
        fontSize: FS.FS24,
        fontFamily: FF[600],
        color: COLORS.BLACK,
        textAlign: 'center',
        lineHeight: LH.LH32,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: LH.LH20,
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
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.BLACK,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    // Button container styles
    buttonContainer: {
        width: '100%',
        marginTop: 24,
        marginBottom: 20,
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
      marginBottom: 20,
    },
    errorContainer: {
        marginBottom: 16,
    },
    errorText: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.ERROR_COLOR,
        marginTop: 6,
        marginLeft: 4,
    },
    apiErrorContainer: {
        backgroundColor: '#FEE2E2',
        borderRadius: 8,
        padding: 12,
        marginTop: 16,
        marginHorizontal: 4,
    },
    apiErrorText: {
        fontSize: FS.FS14,
        fontFamily: FF[500],
        color: '#EF4444',
        textAlign: 'center',
    }
});

export default Loginstyles;