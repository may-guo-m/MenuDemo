import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const MAX_EXCERPT_LENGTH = 200;

export const ExpandableText = ({ detail }: { detail: string }) => {
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const excerpt =
    detail.length > MAX_EXCERPT_LENGTH
      ? `${detail.substring(0, MAX_EXCERPT_LENGTH)}...`
      : detail;

  return (
    <View style={styles.detailContainer}>
      {isDetailExpanded ? (
        <Text style={styles.detailText}>{detail}</Text>
      ) : (
        <>
          <Text style={styles.detailText}>{excerpt}</Text>
          <TouchableOpacity onPress={() => setIsDetailExpanded(true)}>
            <Text style={styles.seeMoreText}>see more</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    margin: 10,
  },
  detailText: {
    fontSize: 16,
  },
  seeMoreText: {
    color: '#007AFF',
    marginTop: 5,
  },
});
