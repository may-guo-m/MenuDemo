import {
  useAction,
  useLoadingStatus,
  useUnaryAction,
} from '@wonder/core-native';
import { mainActions } from '../module/main';
import { useModuleState } from './useRuntimeState';
import { LIST_LOADING_DATA } from '../module/main/type';

export const useListRefreshLoadMore = () => {
  const loading = useLoadingStatus(LIST_LOADING_DATA);
  const { page } = useModuleState('main', ['page']);
  const loadMoreAction = useUnaryAction(mainActions.loadingMoreListSaga);
  const refreshAction = useAction(mainActions.fetchMenusSaga);

  const onRefresh = () => {
    refreshAction();
  };

  const onEndReached = async () => {
    if (!loading) {
      const newPage = page + 1;
      loadMoreAction(newPage);
    }
  };

  return {
    loading,
    page,
    onRefresh,
    onEndReached,
  };
};
