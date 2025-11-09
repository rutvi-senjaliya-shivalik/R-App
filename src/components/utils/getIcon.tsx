/**
 * This function is designed to fetch an icon component based on a name.
 */

import { SvgProps } from 'react-native-svg';
import { TIcon } from '../../types';
import { defaultIcon } from '../../assets/icons';

/**
 * Retrieves the specified SVG icon component.
 *
 * @param {TIcon} name - The name of the icon to fetch.
 * @returns {React.FC<SvgProps> | null} The corresponding SVG icon component if found, otherwise `null`.
 */
export const getIcon = (name: TIcon): React.FC<SvgProps> | null => {
  return defaultIcon[name] || null;
};
