import { Module, register, SagaGenerator } from '@wonder/core-native';
import { RootState } from '../../type/state';
import { ComponentType } from 'react';
import { MenuItem, OrderState } from './type';
import Order from './Order';
import { Navigation } from '../Navigation';
import { Alert } from 'react-native';

const initialState: OrderState = {
  submitMenuItems: {},
};

class OrderMoudle extends Module<RootState, 'order'> {
  *addToCart(
    count: number,
    id: number | undefined,
    price: number | undefined
  ): SagaGenerator {
    if (!id || !price) return;
    const submitMenuItems = { ...this.state.submitMenuItems };
    const item: MenuItem = {
      id,
      price: price,
      count: (submitMenuItems[id]?.count || 0) + count,
    };
    submitMenuItems[item.id] = item;
    this.setState({
      submitMenuItems,
    });
  }
  *deleteToCart(id: number): SagaGenerator {
    const submitMenuItems = { ...this.state.submitMenuItems };
    delete submitMenuItems[id];
    this.setState({
      submitMenuItems,
    });
  }
  *checkout(): SagaGenerator {
    if (!this.rootState.app.login.isLogin) {
      Navigation.switch({
        name: 'Login',
      });
    } else {
      Alert.alert('提交成功');
      this.setState({
        submitMenuItems: {},
      });
      Navigation.rootNavigator?.goBack();
    }
  }
}

const moudle = register(new OrderMoudle('order', initialState));
export const orderActions = moudle.getActions();
export const OrderComponent: ComponentType = moudle.attachLifecycle(Order);
