import React from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { withSafeArea } from '../../../component/SafeAreaHOC';
import { useListRefreshLoadMore } from '../../../hooks/useListOps';
import { LIST_REFRESH_DATA, Menu } from '../type';
import TabBar from './TabBar';
import Loading from '../../../component/Loading';
import { tabItems } from '../../../service/api';
import { ViewOrderBar } from './ViewOrderBar';
import { calculateOrderSummary } from '../../../util/util';
import { MenuItemCell } from './MenuItemCell';
import {
  useNavigateToDetail,
  useNavigateToOrder,
} from '../../../hooks/useNavigation';
import { useModuleState } from '../../../hooks/useRuntimeState';
import { useLoadingStatus } from '@wonder/core-native';

const Footer = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return (
      <View style={style.footerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return null;
};

export const Main: React.FC = withSafeArea(() => {
  const { list: menus } = useModuleState('main', ['list']);
  const refreshing = useLoadingStatus(LIST_REFRESH_DATA);
  const { submitMenuItems } = useModuleState('order', ['submitMenuItems']);
  const { orderPrice, itemCount } = React.useMemo(
    () => calculateOrderSummary(submitMenuItems),
    [submitMenuItems]
  );
  const handleNavigateToOrder = useNavigateToOrder();

  const { loading, onRefresh, onEndReached } = useListRefreshLoadMore();
  const handleNavigateToDetail = useNavigateToDetail<Menu>();

  const flatListRef = React.useRef<FlatList<Menu>>(null);
  const handleTabPress = (index: number) => {
    const targetIndex = index * 5;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: targetIndex });
    }
  };

  const renderMenuItem = ({ item }: { item: Menu }) => {
    const quantity = submitMenuItems[item.id]?.count;
    return (
      <MenuItemCell
        item={item}
        quantity={quantity}
        onPress={handleNavigateToDetail}
      />
    );
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
          ListFooterComponent={<Footer loading={loading} />}
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
  contentContainerStyle: {
    padding: 16,
  },
  footerContainer: {
    marginBottom: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
});
