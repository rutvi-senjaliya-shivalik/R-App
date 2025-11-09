import { StyleSheet } from "react-native";
import { COLORS, FF, FS, LH, SPACING, BORDER_RADIUS } from "../../../constants";

const HelpStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: SPACING.XL,
        paddingTop: SPACING.XXXL,
        alignItems: 'center',
    },
    title: {
        fontSize: FS.FS28,
        fontFamily: FF[600],
        color: COLORS.BLACK,
        textAlign: 'center',
        marginTop: SPACING.LG,
        lineHeight: LH.LH36,
    },
    subtitle: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        marginTop: SPACING.XXL,
        textAlign: 'center',
        lineHeight: LH.LH22,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        borderRadius: BORDER_RADIUS.MD,
        padding: SPACING.XXL,
        marginTop: SPACING.XXL,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.BORDER_GREY,
    },
    iconContainer: {
        borderRadius: BORDER_RADIUS.MD,
        padding: SPACING.MD,
        marginBottom: SPACING.MD,
    },
    icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    cardTitle: {
        fontSize: FS.FS20,
        fontFamily: FF[600],
        color: COLORS.BLACK,
        marginBottom: SPACING.XS,
        lineHeight: LH.LH26,
    },
    cardDesc: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        marginBottom: SPACING.SM,
        textAlign: 'center',
        lineHeight: LH.LH20,
    },
    cardInfo: {
        fontSize: FS.FS16,
        fontFamily: FF[600],
        color: COLORS.BLACK,
        marginBottom: SPACING.MD,
        textAlign: 'center',
        lineHeight: LH.LH22,
    },
    button: {
        backgroundColor: COLORS.BLACK,
        borderRadius: BORDER_RADIUS.SM,
        paddingVertical: SPACING.SM,
        paddingHorizontal: SPACING.XXXL,
        marginTop: SPACING.XS,
    },
    buttonText: {
        color: COLORS.WHITE,
        fontFamily: FF[600],
        fontSize: FS.FS16,
        lineHeight: LH.LH22,
    },
});

export default HelpStyles;