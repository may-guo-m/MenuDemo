import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading: React.FC<{ color?: string; size?: 'small' | 'large' }> = ({
  color = '#0000ff',
  size = 'large',
}) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
