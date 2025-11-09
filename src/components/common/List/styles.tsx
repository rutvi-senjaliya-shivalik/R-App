import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const listStyles = () => {
  return StyleSheet.create({
    rowContainer: {
      borderTopWidth: 1,
      borderColor: COLORS.elements.divider.option1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingVertical: 1,
    },
  });
};
