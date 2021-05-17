import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function index() {
  return (
    <View style={styles.container}>
      <Text>Feature not available!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
