import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS, FONTS, SIZES} from '../../constants';

export default function detailPage() {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: SIZES.height * 0.25,
          width: SIZES.width,
          backgroundColor: COLORS.primary,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <MaterialIcons name="home" size={SIZES.icon} color={COLORS.white} />
          </TouchableOpacity>
          <Text>Test</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
  },
});
