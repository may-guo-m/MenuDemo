import { startApp } from '@wonder/core-native';
import { ErrorHandler } from './app/module/ErrorHandle';
import { AppNavigatorComponent } from './app/module/navigation/index';

startApp({
  registeredAppName: 'demo',
  componentType: AppNavigatorComponent,
  errorListener: new ErrorHandler(),
});
