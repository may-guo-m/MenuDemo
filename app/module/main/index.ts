import { Module, register, SagaGenerator, Loading } from '@wonder/core-native';
import { RootState } from '../../type/state';
import { fetchMenus } from '../../service/api';
import { ComponentType } from 'react';
import { LIST_LOADING_DATA, LIST_REFRESH_DATA, MainState } from './type';
import { call } from 'redux-saga/effects';
import { Main } from './component/Main';

const initialState: MainState = {
  list: [],
  page: 1,
};

class MainMoudle extends Module<RootState, 'main'> {
  *onEnter(): SagaGenerator {
    yield* this.fetchMenusSaga();
  }

  @Loading(LIST_REFRESH_DATA)
  *fetchMenusSaga(): SagaGenerator {
    try {
      this.setState({ page: 1 });
      const Menus = yield call(fetchMenus, 1);
      this.setState({ list: Menus });
    } catch (error) {
      console.log('e', error);
    }
  }

  @Loading(LIST_LOADING_DATA)
  *loadingMoreListSaga(newPage: number): SagaGenerator {
    const menus = yield call(fetchMenus, newPage);
    this.setState({
      list: [...this.state.list, ...menus],
      page: newPage,
    });
  }
}

const moudle = register(new MainMoudle('main', initialState));
export const mainActions = moudle.getActions();
export const MainComponent: ComponentType = moudle.attachLifecycle(Main);
