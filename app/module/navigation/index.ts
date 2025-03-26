import { Module, register } from '@wonder/core-native';
import { ComponentType } from 'react';
import AppNavigator from './AppNavigation';
import { RootState } from '../../type/state';

class AppNavigatorMoudle extends Module<RootState, 'appNavigator'> {}

const moudle = register(new AppNavigatorMoudle('appNavigator', {}));
export const appNavigatorActions = moudle.getActions();
export const AppNavigatorComponent: ComponentType =
  moudle.attachLifecycle(AppNavigator);
