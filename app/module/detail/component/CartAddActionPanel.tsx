import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useBinaryAction } from '@wonder/core-native';
import { orderActions } from '../../order';
import { formatDollarAmount } from '../../../util/util';
import { Navigation } from '../../Navigation';
import { useModuleState } from '../../../hooks/useRuntimeState';

export const CartAddActionPanel = () => {
  const { info } = useModuleState('detail', ['info']);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const addToCartAction = useBinaryAction(orderActions.addToCart, quantity);
  const handleAddToCart = (id: number, price: number) => {
    addToCartAction(id, price);
    Navigation.rootNavigator?.goBack();
  };

  if (!info) return null;
  return (
    <View style={styles.bottomBar}>
      <View style={styles.separator} />
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.controlButton} onPress={handleDecrease}>
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.controlButton} onPress={handleIncrease}>
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart(info.id, info.price)}
      >
        {info.price ? (
          <Text style={styles.buttonText}>{`Add - ${formatDollarAmount(
            info.price * quantity
          )}`}</Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    borderColor: '#006400',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    width: 30,
    height: 30,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    color: '#006400',
    fontSize: 24,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  orderDetailsText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  bottomBar: {
    paddingVertical: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
    borderRadius: 16,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 0,
  },
});
