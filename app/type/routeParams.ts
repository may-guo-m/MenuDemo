import { ParamListBase } from '@react-navigation/native';

export interface RouteParamsList extends ParamListBase {
  Login: undefined;
  Detail: { menuId: number };
  Main: undefined;
  Order: undefined;
}
