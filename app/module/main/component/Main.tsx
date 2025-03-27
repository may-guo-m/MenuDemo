import React from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import { withSafeArea } from '../../../component/SafeAreaHOC';
import { useListRefreshLoadMore } from '../../../hooks/useListOps';
import { Menu } from '../type';
import TabBar from './TabBar';
import Loading from '../../../component/Loading';
import { tabItems } from '../../../service/api';
import { ViewOrderBar } from './ViewOrderBar';
import { MenuItemCell } from './MenuItemCell';
import { useModuleState } from '../../../hooks/useRuntimeState';

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
  const { submitMenuItems } = useModuleState('order', ['submitMenuItems']);
  const { refreshing, loading, onRefresh, onEndReached } =
    useListRefreshLoadMore();
  const flatListRef = React.useRef<FlatList<Menu>>(null);

  const renderMenuItem = ({ item }: { item: Menu }) => {
    const quantity = submitMenuItems[item.id]?.count;
    return <MenuItemCell item={item} quantity={quantity} />;
  };

  if (refreshing && !menus?.length) {
    return <Loading />;
  }

  return (
    <View style={style.container}>
      <TabBar tabItems={tabItems} flatListRef={flatListRef} />
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
        <ViewOrderBar />
      </View>
    </View>
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
