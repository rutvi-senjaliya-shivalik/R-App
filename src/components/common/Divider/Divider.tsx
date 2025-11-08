import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { dividerStyles } from './styles';
import { COLORS } from '../../../constants';

interface DividerProps {
  variant?: 'vertical' | 'horizontal';
  color?: 'option1' | 'option2';
  text?: string;
  viewStyle?: ViewStyle;
  ignoreInsets?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  color = 'option1',
  text,
  viewStyle,
  ignoreInsets,
}) => {
  const styles = dividerStyles();

  let divider = (
    <View
      style={[
        { backgroundColor: COLORS.elements.divider[color] },
        styles[variant],
        text ? styles.withTextDivider : undefined,
        viewStyle,
      ]}
    />
  );

  if (text) {
    divider = (
      <View style={styles.withTextContainer}>
        {divider}
        <Text numberOfLines={1} style={styles.text}>
          {text}
        </Text>
        {divider}
      </View>
    );
  }

  if (ignoreInsets) {
    divider = (
      <View
        style={
          variant === 'horizontal'
            ? styles.ignoreInsetsHorizontalContainer
            : styles.ignoreInsetsVerticalContainer
        }
      >
        {divider}
      </View>
    );
  }

  return divider;
};
