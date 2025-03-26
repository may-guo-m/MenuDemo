import { Module, register, SagaGenerator, Loading } from '@wonder/core-native';
import { RootState } from '../../type/state';
import { fetchMenus } from '../../service/api';
import { ComponentType } from 'react';
import { LOADING_DATA, MainState } from './type';
import { call } from 'redux-saga/effects';
import { Main } from './component/Main';

const initialState: MainState = {
  refreshing: false,
  loading: false,
  list: [],
  page: 1,
};

class MainMoudle extends Module<RootState, 'main'> {
  *onEnter(): SagaGenerator {
    yield* this.fetchMenusSaga();
  }

  @Loading(LOADING_DATA)
  *fetchMenusSaga(): SagaGenerator {
    try {
      this.setState({ refreshing: true, page: 1 });
      const Menus = yield call(fetchMenus, 1);
      this.setState({ list: Menus, refreshing: false });
    } catch (error) {
      console.log('e', error);
    }
  }

  *loadingMoreListSaga(newPage: number): SagaGenerator {
    try {
      this.setState({ loading: true });
      const Menus = yield call(fetchMenus, newPage);
      this.setState({
        list: [...this.state.list, ...Menus],
        loading: false,
        page: newPage,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }
}

const moudle = register(new MainMoudle('main', initialState));
export const mainActions = moudle.getActions();
export const MainComponent: ComponentType = moudle.attachLifecycle(Main);
