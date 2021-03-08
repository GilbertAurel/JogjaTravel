import React from 'react';
import {View, StatusBar, StyleSheet, ScrollView} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONTS, SIZES, COLORS} from '../../../constants';

import HomeHeader from './header';
import HomeBody from './body';

export default function home(props) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader {...props} />
        <HomeBody {...props} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
