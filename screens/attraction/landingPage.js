import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES, SERVER} from '../../constants';

export default function landing({item, scrollRef, navigation}) {
  const priceRating = () => {
    if (item.price == 'affordable') return 1;
    else if (item.price == 'fair') return 2;
    else return 3;
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={{uri: `${SERVER}/${item.imageURL}`}}
        resizeMode="cover"
        style={styles.container}
      />

      {/* darken effect */}
      <View
        style={{
          ...styles.container,
          ...styles.darken,
          position: 'absolute',
        }}
      />

      {/* title page */}
      <View style={styles.title}>
        {/* name */}
        <Text style={{...FONTS.h1, color: COLORS.white}}>{item.title}</Text>

        {/* rating */}
        <View style={{flexDirection: 'row', marginBottom: SIZES.paddingNormal}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: SIZES.paddingNormal,
            }}>
            <MaterialIcons
              name="star"
              size={SIZES.icon * 0.8}
              color={COLORS.yellow}
            />
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.white,
                marginLeft: SIZES.paddingNormal * 0.5,
              }}>
              {item.rating}
            </Text>
          </View>
          {[1, 2, 3].map((rating) => (
            <Text
              key={rating}
              style={{
                ...FONTS.body2,
                color: rating <= priceRating() ? COLORS.white : COLORS.gray,
              }}>
              $
            </Text>
          ))}
        </View>

        {/* description */}
        <Text style={{...FONTS.body2, color: COLORS.white}}>
          {item.description}
        </Text>
      </View>

      {/* more button */}
      <View style={styles.moreButton}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => scrollRef.current.scrollToEnd()}>
          <Text style={{...FONTS.body3, color: COLORS.white}}>read more</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={SIZES.icon}
            color={COLORS.white}
            style={{
              margin: 0,
              padding: 0,
            }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.bodyBackButton}
        onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="arrow-back"
          size={SIZES.icon}
          color={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
  },
  title: {
    position: 'absolute',
    bottom: SIZES.height * 0.15,
    left: SIZES.width * 0.08,
    width: SIZES.width * 0.7,
  },
  darken: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  moreButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: SIZES.height * 0.02,
    alignItems: 'center',
  },
  bodyBackButton: {
    position: 'absolute',
    top: 40,
    left: SIZES.paddingWide * 1.5,
    height: SIZES.icon * 2,
    width: SIZES.icon * 2,
  },
});
