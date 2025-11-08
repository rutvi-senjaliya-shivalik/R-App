import { mapValues } from 'lodash';
import { defaultIcon } from '../../assets/icons';
// import { defaultImages } from '../../theme/images';

export type TIcon = keyof typeof defaultIcon;

export type TIcons = {
  [key in TIcon]: TIcon;
};

export const ICON_TYPES: TIcons = mapValues(
  defaultIcon,
  (val, key) => key as TIcon,
);

// export type TImage = keyof typeof defaultImages;
// export type TImages = {
//   [key in TImage]: TImage;
// };

// export const IMAGE_TYPES: TImages = mapValues(
//   defaultImages,
//   (val, key) => key as TImage,
// );
