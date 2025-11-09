/**
 * This component are used for rendering an SVG icon component dynamically with props using this JSX.
 */
import React from 'react';
import { StyleProp, ViewStyle, ColorValue } from 'react-native';
import { iconStyleCreater } from './styles';
import { TIcon } from '../../../types/props';
import { omitBy, isUndefined } from 'lodash';
import { getIcon } from '../../utils/getIcon';
import { COLORS } from '../../../constants';

export interface IconAtomProps {
  name: TIcon;
  color?: ColorValue;
  size?: number;
  sizes?: {
    width: number;
    height?: number;
  };
  styles?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconAtomProps> = ({
  name,
  color,
  styles,
  sizes,
  size,
}) => {
  const defaultStyles = styles ? styles : iconStyleCreater().iconStyle;

  const IconComponent = getIcon(name);

  const defaultSizes = omitBy(
    {
      width: size,
      height: size,
    },
    value => isUndefined(value),
  );

  const colorDefault = color ?? '#e1470a';

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      style={defaultStyles}
      color={colorDefault}
      {...(sizes || defaultSizes)}
    />
  );
};
