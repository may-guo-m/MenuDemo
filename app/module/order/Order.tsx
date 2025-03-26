import React, { useMemo } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MenuItem } from './type';
import { RootState } from '../../type/state';
import { Menu } from '../main/type';
import { useAction, useUnaryAction } from '@wonder/core-native';
import { orderActions } from '.';
import { withCustomBottomBar } from '../../component/BottomBarHOC';
import { withSafeArea } from '../../component/SafeAreaHOC';
import { mapAndFilterItems } from '../../util/util';

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
  const menus = useSelector((state: RootState) => state.app.main.list);
  const submitMenuItems: { [id: number]: MenuItem } = useSelector(
    (state: RootState) => state.app.order.submitMenuItems
  );
  const listArray = useMemo(() => {
    return mapAndFilterItems(submitMenuItems, menus);
  }, [submitMenuItems, menus]);

  const addToCart = useUnaryAction(orderActions.deleteToCart);
  const checkout = useAction(orderActions.checkout);

  const renderMenuItem = React.useCallback(
    (data: { item: Menu & MenuItem }) => {
      const { item } = data;
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => checkout()}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={{ width: 80, height: 80, marginRight: 10 }}
                resizeMode="cover"
              />
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {item?.name}
                </Text>
                <Text>{item?.description}</Text>
                {item.count > 0 && (
                  <Text style={{ color: 'red' }}>已加入 {item.count} 份</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addToCart(item.id)}
            style={{ padding: 10 }}
          >
            <Text style={{ color: 'red' }}>删除</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [menus]
  );

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
