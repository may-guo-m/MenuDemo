import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from '../../main/type';
import { useNavigateToDetail } from '../../../hooks/useNavigation';
import { useUnaryAction } from '@wonder/core-native';
import { orderActions } from '..';
import { MenuItem } from '../type';

export interface OrderCellItem {
  item: Menu & MenuItem;
}

const OrderCell = ({ item }: OrderCellItem) => {
  const addToCart = useUnaryAction(orderActions.deleteToCart);
  const handleNavigateToDetail = useNavigateToDetail<Menu>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
        <View style={styles.cellContainer}>
          <Image
            source={{ uri: item?.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.titleText}>{item?.name}</Text>
            <Text style={styles.descriptionText}>{item?.description}</Text>
            {item.count > 0 && (
              <Text style={styles.countText}>已加入 {item.count} 份</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => addToCart(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cellContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {},
  countText: {
    color: 'red',
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    color: 'red',
  },
});
export default React.memo(OrderCell);
