import React, {ComponentProps, memo, useRef} from 'react';
import {View} from 'react-native';
import {HandlerContainerContext} from './context';

interface Props extends ComponentProps<typeof View> {}

export const HandleContainer = memo((props: Props) => {
  const ref = useRef(null);
  return (
    <HandlerContainerContext.Provider value={ref}>
      <View ref={ref} {...props} />
    </HandlerContainerContext.Provider>
  );
});
