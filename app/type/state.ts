import { State } from '@wonder/core-native';
import { MainState } from '../module/main/type';
import { DetailState } from '../module/detail/type';
import { OrderState } from '../module/order/type';
import { LoginState } from '../module/login/type';

export interface RootState extends State {
  app: {
    main: MainState;
    appNavigator: {};
    detail: DetailState;
    order: OrderState;
    login: LoginState;
  };
}
