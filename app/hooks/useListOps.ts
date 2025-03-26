import { useAction, useSelector, useUnaryAction } from '@wonder/core-native';
import { RootState } from '../type/state';
import { mainActions } from '../module/main';

export const useListRefreshLoadMore = () => {
  const loading = useSelector((state: RootState) => state.app.main.loading);
  const page = useSelector((state: RootState) => state.app.main.page);

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
