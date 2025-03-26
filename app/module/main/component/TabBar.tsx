import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabBarProps {
  tabItems: string[];
  onTabPress: (index: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabItems, onTabPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {tabItems.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onTabPress(index)}
          style={[
            styles.tabItem,
            // 这里可以根据选中状态添加不同样式，目前暂未实现
          ]}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TabBar;
