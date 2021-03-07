import React from 'react';
import {View, Text} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../../../constants';

export default function index() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <MaterialIcons
          name="explore"
          size={SIZES.icon * 4}
          color={COLORS.gray}
        />
        <Text style={{...FONTS.h2, color: COLORS.gray, marginTop: 10}}>
          Discovery not found!
        </Text>
      </View>
    </View>
  );
}
