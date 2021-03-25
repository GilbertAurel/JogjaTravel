import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {SIZES, COLORS} from '../../../constants';

import HomeHeader from './header';
import HomeBody from './body';

export default function home(props) {
  return (
    <View style={styles.container}>
      <View style={styles.navigationBackground} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader {...props} />
        <HomeBody {...props} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  navigationBackground: {
    position: 'absolute',
    height: 60,
    width: SIZES.width,
    bottom: 0,
    elevation: 1,
    backgroundColor: COLORS.white,
  },
});
