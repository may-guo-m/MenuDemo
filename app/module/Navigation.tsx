import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { InitialRouter } from './navigation/initialRouter';
import { NavigationContainerRef } from '@react-navigation/native';
import { RouteParamsList } from '../type/routeParams';

export type NavigationRef = NavigationContainerRef<RouteParamsList>;
export interface NavigationNavigateParams<T, U> {
  name: T;
  key?: string;
  params?: U;
  merge?: boolean;
}

export class Navigation {
  static rootNavigator: NavigationRef | null;

  static get navigation(): NavigationRef | null {
    return Navigation.rootNavigator;
  }

  static switch<Name extends keyof RouteParamsList>(
    options: NavigationNavigateParams<Name, RouteParamsList[Name]>
  ) {
    const { name, params } = options;
    if (Navigation.rootNavigator) {
      Navigation.rootNavigator.navigate<Name>(name, params);
    } else {
      console.error('Navigation root navigator is not initialized.');
    }
  }

  static RootRouter: React.FunctionComponent<any> = () => {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer
          ref={(_: NavigationRef) => {
            console.log('NavigationContainer', _);
            Navigation.rootNavigator = _;
          }}
        >
          <InitialRouter />
        </NavigationContainer>
      </View>
    );
  };
}
