import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../type/state';

type Keys<T extends keyof RootState['app']> = keyof RootState['app'][T];

export function useModuleState<
  M extends Partial<{
    [key in keyof RootState['app']]: Array<Keys<key>>;
  }>,
  T extends keyof M
>(
  moduleKeys: M
): {
  [key in T]: key extends keyof RootState['app']
    ? Pick<
        RootState['app'][key],
        M[key] extends Array<Keys<key>> ? M[key][number] : never
      >
    : never;
};

export function useModuleState<
  M extends keyof RootState['app'],
  T extends keyof RootState['app'][M]
>(moduleStateName: M, keys: Array<T>): Pick<RootState['app'][M], T>;

export function useModuleState<
  M extends
    | Partial<{
        [key in keyof RootState['app']]: Array<Keys<key>>;
      }>
    | keyof RootState['app'],
  T extends M extends keyof RootState['app']
    ? keyof RootState['app'][M]
    : keyof M
>(moduleNameOrKeys: M, keys?: Array<T>) {
  const state = useSelector(
    (state: RootState) => {
      if (typeof moduleNameOrKeys === 'string') {
        return getModuleState(
          state,
          moduleNameOrKeys,
          keys as any
        ) as M extends keyof RootState['app']
          ? T extends keyof RootState['app'][M]
            ? Pick<RootState['app'][M], T>
            : never
          : never;
      }
      return (
        Object.keys(moduleNameOrKeys) as Array<keyof RootState['app']>
      ).reduce(
        (result: any, moduleStateName) => {
          result[moduleStateName] = getModuleState(
            state,
            moduleStateName,
            moduleNameOrKeys[moduleStateName] as Array<
              Keys<typeof moduleStateName>
            >
          );
          return result;
        },
        {} as {
          [key in T]: key extends keyof RootState['app']
            ? Pick<
                RootState['app'][key],
                key extends keyof M
                  ? M[key] extends Array<Keys<key>>
                    ? M[key][number]
                    : never
                  : never
              >
            : never;
        }
      );
    },
    (left, right) => {
      if (typeof moduleNameOrKeys === 'string') {
        return compareState(left, right, moduleNameOrKeys, keys as any);
      }
      return !(
        Object.keys(moduleNameOrKeys) as Array<keyof RootState['app']>
      ).some(
        (moduleStateName) =>
          !compareState(
            left[moduleStateName],
            right[moduleStateName],
            moduleStateName,
            moduleNameOrKeys[moduleStateName] as Array<
              Keys<typeof moduleStateName>
            >
          )
      );
    }
  );

  return useMemo(() => state ?? {}, [state]);
}

const getModuleState = <
  T extends keyof RootState['app'],
  P extends keyof RootState['app'][T]
>(
  state: RootState,
  moduleStateName: T,
  keys: Array<P>
) => {
  if (!state.app[moduleStateName]) {
    return {};
  }
  return keys.reduce((moduleState, key) => {
    moduleState[key] = state.app[moduleStateName][key];
    return moduleState;
  }, {} as RootState['app'][T]);
};

const compareState = <
  T extends keyof RootState['app'],
  P extends keyof RootState['app'][T],
  S extends Pick<RootState['app'][T], P>
>(
  left: S,
  right: S,
  moduleStateName: T,
  keys: Array<P>
): boolean => {
  if (!left || !right) {
    return true;
  }
  for (const key of keys) {
    if (left[key] !== right[key]) {
      return false;
    }
  }
  return true;
};
