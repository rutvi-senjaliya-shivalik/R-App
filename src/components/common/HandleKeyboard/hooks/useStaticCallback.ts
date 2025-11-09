import { DependencyList, useCallback, useLayoutEffect, useRef } from 'react';

export function useStaticCallback(
  callback: (...args: any[]) => any,
  deps: DependencyList,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const simpleCallback = useCallback(callback, deps);
  const staticCallback = useRef(simpleCallback);

  useLayoutEffect(() => {
    staticCallback.current = simpleCallback;
  }, [simpleCallback]);

  return useCallback((...args) => {
    return staticCallback.current(...args);
  }, []);
}
