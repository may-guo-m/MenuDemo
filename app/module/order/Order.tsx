import React, { useMemo } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuItem } from './type';
import { RootState } from '../../type/state';
import { useAction } from '@wonder/core-native';
import { orderActions } from './index';
import { withCustomBottomBar } from '../../component/BottomBarHOC';
import { withSafeArea } from '../../component/SafeAreaHOC';
import { mapAndFilterItems } from '../../util/util';
import OrderCell, { OrderCellItem } from './component/orderCell';
import { useModuleState } from '../../hooks/useRuntimeState';

const CheckoutBottomBar = withCustomBottomBar(
  ({ onPress }: { onPress: () => void }) => {
    return (
      <TouchableOpacity style={bottonStyles.container} onPress={onPress}>
        <Text style={bottonStyles.text}>Continue to checkout</Text>
      </TouchableOpacity>
    );
  }
);

const Order = withSafeArea(() => {
  const { list: menus } = useModuleState('main', ['list']);
  const { submitMenuItems } = useModuleState('order', ['submitMenuItems']);
  const listArray = useMemo(() => {
    return mapAndFilterItems(submitMenuItems, menus);
  }, [submitMenuItems, menus]);
  const checkout = useAction(orderActions.checkout);

  const renderMenuItem = ({ item }: OrderCellItem) => {
    return <OrderCell item={item} />;
  };
  return (
    <>
      <FlatList
        data={listArray}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <CheckoutBottomBar onPress={checkout} />
    </>
  );
});

const bottonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Order;
