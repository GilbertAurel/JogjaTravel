import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS, FONTS, SIZES, IMAGE} from '../../../constants';

export default function header({navigation}) {
  function renderBackground() {
    return (
      <View
        style={{
          ...styles.container,
        }}>
        <View
          style={{
            ...styles.container,
            ...styles.darken,
            position: 'absolute',
            elevation: 1,
          }}
        />
        <Image
          source={IMAGE.HEADER_HOME}
          resizeMode="contain"
          style={styles.bgImage}
        />
      </View>
    );
  }

  function renderTitle() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Culture</Text>
        <Text style={styles.title}>Nature</Text>
        <Text style={styles.title}>Adventure.</Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('listing')}>
          <Text style={styles.browseLabel}>Browse Attractions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTopBar() {
    return (
      <View style={styles.topBarContainer}>
        <View style={styles.topBarInner}>
          <Image
            source={IMAGE.LOGO}
            resizeMode="contain"
            style={styles.topBarLogo}
          />
          <MaterialIcons
            name="notifications-none"
            size={SIZES.icon}
            color={COLORS.white}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderBackground()}
      {renderTopBar()}
      {renderTitle()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height * 0.7,
    width: SIZES.width,
  },
  titleContainer: {
    position: 'absolute',
    left: SIZES.width * 0.1,
    top: SIZES.height * 0.35,
    elevation: 2,
  },
  topBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    elevation: 2,
    alignItems: 'center',
  },
  topBarInner: {
    width: SIZES.width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarLogo: {
    height: 30,
    width: 70,
  },
  bgImage: {
    position: 'absolute',
    left: -300,
    top: -70,
  },
  title: {
    ...FONTS.title,
    color: COLORS.white,
  },
  browseButton: {
    width: SIZES.width * 0.4,
    height: SIZES.icon,
    marginTop: SIZES.paddingNormal,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  browseLabel: {
    ...FONTS.body1,
    color: COLORS.white,
  },
  darken: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
