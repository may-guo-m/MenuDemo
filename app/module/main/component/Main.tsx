import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { withSafeArea } from '../../../component/SafeAreaHOC';
import { RootState } from '../../../type/state';
import { MenuItem } from '../../order/type';
import { useListRefreshLoadMore } from '../../../hooks/useListOps';
import { Menu } from '../type';
import TabBar from './TabBar';
import Loading from '../../../component/Loading';
import { tabItems } from '../../../service/api';
import { ViewOrderBar } from './ViewOrderBar';
import { calculateOrderSummary } from '../../../util/util';
import { Navigation } from '../../Navigation';

export const Main: React.FC = withSafeArea(() => {
  const menus = useSelector((state: RootState) => state.app.main.list);
  const refreshing = useSelector(
    (state: RootState) => state.app.main.refreshing
  );
  const submitMenuItems: { [id: number]: MenuItem } = useSelector(
    (state: RootState) => state.app.order.submitMenuItems
  );
  const { loading, onRefresh, onEndReached } = useListRefreshLoadMore();

  const { orderPrice, itemCount } = React.useMemo(
    () => calculateOrderSummary(submitMenuItems),
    [submitMenuItems]
  );

  const flatListRef = React.useRef(null);

  const handleNavigateToDetail = (item: Menu) =>
    Navigation.switch({
      name: 'Detail',
      params: { menuId: item.id },
    });

  const handleNavigateToOrder = () =>
    Navigation.switch({
      name: 'Order',
    });

  const handleTabPress = (index: number) => {
    const targetIndex = index * 5;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: targetIndex });
    }
  };

  const renderMenuItem = React.useCallback(
    ({ item }: { item: Menu }) => {
      const quantity = submitMenuItems[item.id]?.count;
      return (
        <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
          <View style={style.cellContainer}>
            <View>
              <Image
                source={{ uri: item.imageUrl }}
                style={style.cellImage}
                resizeMode="cover"
              />
              {quantity > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    left: -5,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    {quantity}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text
                style={style.cellTitleText}
              >{`${item.name} + ${item.id}`}</Text>
              <Text style={style.cellDesText} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [submitMenuItems]
  );

  const renderFooter = () => {
    if (loading) {
      return (
        <View
          style={{
            marginBottom: 20,
            paddingVertical: 20,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            alignItems: 'center',
          }}
        >
          <Text>加载中...</Text>
        </View>
      );
    }
    return null;
  };

  if (refreshing && !menus?.length) {
    return <Loading />;
  }

  return (
    <>
      <View style={style.container}>
        <TabBar tabItems={tabItems} onTabPress={handleTabPress} />
        <FlatList
          ref={flatListRef}
          data={menus}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          extraData={submitMenuItems}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          contentContainerStyle={style.contentContainerStyle}
        />
        <View style={style.orderViewButton}>
          <ViewOrderBar
            orderPrice={orderPrice}
            itemCount={itemCount}
            onPress={handleNavigateToOrder}
          />
        </View>
      </View>
    </>
  );
});

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: { flex: 1 },
  orderViewButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cellContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellImage: { width: 80, height: 80, marginRight: 10 },
  cellTitleText: { fontSize: 18, fontWeight: 'bold' },
  cellDesText: { fontSize: 16, color: '#999' },
  contentContainerStyle: {
    padding: 16,
  },
});
