import {StyleSheet} from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

export const dividerStyles = () => {
  return StyleSheet.create({
    withTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    vertical: {
      width: 1,
      height: '100%',
    },
    horizontal: {
      height: 1,
      width: '100%',
    },
    text: {
      fontSize: FS.FS16,
      lineHeight: LH.LH22,
      fontFamily: FF[500],
      color: COLORS.text.primary,
      marginHorizontal: 20,
      maxWidth: '80%',
    },
    withTextDivider: {
      flex: 1,
    },
    ignoreInsetsHorizontalContainer: {
      marginHorizontal: -100,
    },
    ignoreInsetsVerticalContainer: {
      marginVertical: -100,
    },
  });
};
