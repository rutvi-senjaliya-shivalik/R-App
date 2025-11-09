// Why is it required?
// Problem: TypeScript doesn’t natively understand how to import .svg files in React Native.
// Fix: This declaration tells TypeScript that any file ending in .svg should be treated
// as a React component with SvgProps.
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module 'redux-persist/lib/storage';
