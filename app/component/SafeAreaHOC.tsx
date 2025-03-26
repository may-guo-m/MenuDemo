import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export const withSafeArea = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <WrappedComponent {...props} />
      </SafeAreaView>
    );
  };
};
