import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDollarAmount } from '../../../util/util';
import { withCustomBottomBar } from '../../../component/BottomBarHOC';

const Content = ({
  itemCount,
  orderPrice,
  onPress,
}: {
  itemCount: number;
  orderPrice: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <Text style={styles.text}>{itemCount}</Text>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.text}>view order</Text>
        <Text style={styles.text}>Blue Apron</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.text}>{formatDollarAmount(orderPrice)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export const ViewOrderBar = withCustomBottomBar(Content);
