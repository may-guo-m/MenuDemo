import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#006400',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
});

export const withCustomBottomBar = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    return (
      <View style={styles.bottomBar}>
        <WrappedComponent {...props} />
      </View>
    );
  };
};
