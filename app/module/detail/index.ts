import { Module, register, SagaGenerator } from '@wonder/core-native';
import { RootState } from '../../type/state';
import { ComponentType } from 'react';
import Detail from './component/Detail';
import { fetchMenuItemDetails } from '../../service/api';
import { DETAIL_LOADING_DATA, DetailState } from './type';
import { call } from 'redux-saga/effects';
import { Loading } from '@wonder/core-native';

const initialState: DetailState = {
  info: null,
};

class DetailsMoudle extends Module<RootState, 'detail'> {
  *onEnter(routeParameters: { menuId: number }): SagaGenerator {
    yield* this.fetchItemDetailSaga(routeParameters.menuId);
  }

  @Loading(DETAIL_LOADING_DATA)
  *fetchItemDetailSaga(menuId: number): SagaGenerator {
    try {
      this.setState({ info: null });
      const info = yield call(fetchMenuItemDetails, menuId);
      this.setState({ info });
    } catch (error) {
      this.setState({ info: null });
      console.log('e', error);
    }
  }
  *navigateToDetail(menuId: number): SagaGenerator {
    // 这里怎么拿navigation呢？
    // navigation.navigate('Detail', { menuId: Menu.id })
  }
}

const moudle = register(new DetailsMoudle('detail', initialState));
export const detailActions = moudle.getActions();
export const DetailComponent: ComponentType = moudle.attachLifecycle(Detail);
