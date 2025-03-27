import React, { useMemo } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../type/state';
import {
  DETAIL_LOADING_DATA,
  ItemType,
  MenuItemDetails,
  RenderItemType,
} from '../type';
import { useLoadingStatus } from '@wonder/core-native';
import { withSafeArea } from '../../../component/SafeAreaHOC';
import Loading from '../../../component/Loading';
import { CartAddActionPanel } from './CartAddActionPanel';
import { ExpandableText } from './ExpandableText';

const ScreenWidth = Dimensions.get('screen').width;

const Detail = withSafeArea(() => {
  const info: MenuItemDetails | null = useSelector(
    (state: RootState) => state.app.detail.info
  );
  const loading = useLoadingStatus(DETAIL_LOADING_DATA);

  const listData: RenderItemType[] = useMemo(
    () =>
      info
        ? [
            { type: ItemType.Image, data: info.imageUrl || '' },
            { type: ItemType.Name, data: `${info.name} + ${info.id}` || '' },
            { type: ItemType.Description, data: info.description || '' },
            { type: ItemType.CookingTime, data: info.cookingTime || '' },
            { type: ItemType.Detail, data: info.detail || '' },
            { type: ItemType.Instructions, data: info.instructionsUrl || '' },
            { type: ItemType.Nutrition, data: info.nutritionUrl || '' },
          ]
        : [],
    [info]
  );

  const renderItem = ({ item }: { item: RenderItemType }) => {
    switch (item.type) {
      case ItemType.Image:
        return (
          <Image
            source={{ uri: item.data }}
            style={[styles.image, styles.padding]}
            resizeMode="cover"
          />
        );
      case ItemType.Name:
        return (
          <Text style={[styles.nameText, styles.padding]}>{item.data}</Text>
        );
      case ItemType.Description:
        return <Text style={styles.padding}>{item.data}</Text>;
      case ItemType.CookingTime:
        return (
          <View style={styles.cookingTimeContainer}>
            <Text style={styles.cookingTimeText}>{item.data}</Text>
          </View>
        );
      case ItemType.Detail:
        return <ExpandableText detail={item.data} />;
      case ItemType.Instructions:
        return (
          <TouchableOpacity style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
            <Text style={styles.arrowText}>&gt; </Text>
          </TouchableOpacity>
        );
      case ItemType.Nutrition:
        return (
          <TouchableOpacity style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>NUTRITION</Text>
            <Text style={styles.arrowText}>&gt; </Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      <CartAddActionPanel />
    </View>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  flatListContent: {
    paddingBottom: 50,
  },
  padding: {
    paddingHorizontal: 20,
  },
  image: { width: ScreenWidth, height: 300, alignSelf: 'center' },
  nameText: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  customizationText: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  cookingTimeContainer: {
    padding: 5,
    backgroundColor: 'green',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'flex-start',
  },
  cookingTimeText: {
    fontSize: 16,
  },
  sectionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
  },
  arrowText: {
    fontSize: 16,
  },
});

export default Detail;
