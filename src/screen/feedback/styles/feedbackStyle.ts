import { StyleSheet } from "react-native";
import { COLORS, FF, FS, SPACING, BORDER_RADIUS } from "../../../constants";

const feedbackStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
      paddingHorizontal: SPACING.XL,
    },
    scrollContent: {
      paddingBottom: SPACING.XL,
    },
    section: {
      marginBottom: SPACING.XXL,
    },
    inputContainer: {
      marginBottom: SPACING.LG,
    },
    inputLabel: {
      fontSize: FS.FS18,
      fontFamily: FF[400],
      color: COLORS.BLACK,
      marginTop: SPACING.XL,
    },
    textInput: {
      borderWidth: 1,
      borderColor: COLORS.BORDER_GREY,
      borderRadius: BORDER_RADIUS.SM,
      paddingHorizontal: SPACING.MD,
      paddingVertical: SPACING.MD,
      fontSize: FS.FS16,
      backgroundColor: COLORS.WHITE,
      color: COLORS.BLACK,
      marginTop: SPACING.XXL,
    },
    messageInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    uploadButton: {
      borderWidth: 1,
      borderColor: COLORS.BORDER_GREY,
      borderRadius: BORDER_RADIUS.SM,
      borderStyle: 'dashed',
      paddingVertical: SPACING.LG,
      paddingHorizontal: SPACING.MD,
      backgroundColor: COLORS.WHITE,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SPACING.MD,
    },
    uploadButtonText: {
      fontSize: FS.FS16,
      fontFamily: FF[500],
      color: COLORS.GREY_TEXT,
    },
    imageNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: SPACING.MD,
      borderRadius: BORDER_RADIUS.SM,
      borderWidth: 1,
      borderColor: COLORS.BORDER_GREY,
      backgroundColor: COLORS.WHITE,
      paddingVertical: SPACING.MD,
      paddingHorizontal: SPACING.MD,
    },
    imageName: {
      flex: 1,
      fontSize: FS.FS14,
      fontFamily: FF[400],
      color: COLORS.BLACK,
      marginRight: SPACING.SM,
    },
    removeImageButton: {
      paddingVertical: SPACING.SM,
      paddingHorizontal: SPACING.MD,
      borderRadius: BORDER_RADIUS.SM,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeImageText: {
      color: COLORS.BLACK,
      fontSize: FS.FS16,
      fontFamily: FF[600],
    },
    submitSection: {
      marginTop: SPACING.XXL,
      marginBottom: SPACING.XXXL,
      alignItems: 'center',
    },
  });

export default feedbackStyle;