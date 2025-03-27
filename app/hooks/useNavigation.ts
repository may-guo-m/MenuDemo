import React from 'react';
import { Navigation } from '../module/Navigation';

export const useNavigateToDetail = <T extends { id: number }>() => {
  const handleNavigateToDetail = React.useCallback(
    (item: T) =>
      Navigation.switch({
        name: 'Detail',
        params: { menuId: item.id },
      }),
    []
  );

  return handleNavigateToDetail;
};

export const useNavigateToOrder = () => {
  const handleNavigateToOrder = () =>
    Navigation.switch({
      name: 'Order',
    });
  return handleNavigateToOrder;
};
