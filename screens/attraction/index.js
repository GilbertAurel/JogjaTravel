import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

export default function index({route}) {
  const {item} = route.params;

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={item.image}
            resizeMode="cover"
            style={styles.container}
          />
          <View
            style={{
              ...styles.container,
              ...styles.darken,
              position: 'absolute',
            }}
          />
          <View style={styles.title}>
            <Text style={{...FONTS.h1, color: COLORS.white}}>{item.title}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text>Test second page</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
  },
  title: {
    position: 'absolute',
    bottom: SIZES.height * 0.3,
    left: SIZES.width * 0.08,
  },
  darken: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
