import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from '../type';
import { useNavigateToDetail } from '../../../hooks/useNavigation';

export const MenuItemCell = React.memo(
  ({ item, quantity }: { item: Menu; quantity: number }) => {
    console.log('MenuItemCell', item.id);
    const handleNavigateToDetail = useNavigateToDetail<Menu>();
    return (
      <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
        <View style={styles.cellContainer}>
          <View>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.cellImage}
              resizeMode="cover"
            />
            {quantity > 0 && (
              <View style={styles.quantityBubble}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
            )}
          </View>
          <View>
            <Text
              style={styles.cellTitleText}
            >{`${item.name} + ${item.id}`}</Text>
            <Text style={styles.cellDesText} numberOfLines={1}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
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
  quantityBubble: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  quantityText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
});
