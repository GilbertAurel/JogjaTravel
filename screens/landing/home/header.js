import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS, FONTS, SIZES, MENU, IMAGE} from '../../../constants';

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
          style={{
            position: 'absolute',
            left: -300,
            top: -70,
          }}
        />
      </View>
    );
  }

  function renderTitle() {
    return (
      <View style={styles.titleContainer}>
        <Text
          style={{
            ...FONTS.title,
            color: COLORS.white,
          }}>
          Culture
        </Text>
        <Text
          style={{
            ...FONTS.title,
            color: COLORS.white,
          }}>
          Nature
        </Text>
        <Text
          style={{
            ...FONTS.title,
            color: COLORS.white,
          }}>
          Adventure.
        </Text>
        <TouchableOpacity
          style={{
            width: SIZES.width * 0.4,
            height: SIZES.icon,
            marginTop: SIZES.paddingNormal,
            borderRadius: SIZES.radius,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.secondary,
          }}>
          <Text style={{...FONTS.body1, color: COLORS.white}}>
            Browse Attractions
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTopBar() {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 50,
          elevation: 2,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: SIZES.width * 0.8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={IMAGE.LOGO}
            resizeMode="contain"
            style={{
              height: 30,
              width: 70,
            }}
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

  function renderSearchBar() {
    return (
      <View
        style={{
          width: SIZES.width,
          marginTop: SIZES.paddingWide * 1.5,
          paddingHorizontal: SIZES.paddingWide,
        }}>
        <TextInput
          placeholder="search your destination.."
          style={{
            height: 30,
            paddingVertical: 0,
            paddingLeft: 20,
            paddingRight: 40,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            ...FONTS.body2,
          }}
        />
        <View
          style={{
            position: 'absolute',
            elevation: 1,
            right: SIZES.paddingWide * 1.5,
            top: 5,
          }}>
          <MaterialIcons
            name="search"
            size={SIZES.icon * 0.75}
            color={COLORS.primary}
          />
        </View>
      </View>
    );
  }

  function renderCategories() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.paddingWide,
          marginBottom: SIZES.paddingWide * 2,
          paddingHorizontal: SIZES.paddingWide,
        }}>
        {MENU.map((item) => {
          return (
            <TouchableOpacity
              style={{
                height: 80,
                width: 65,
                marginRight: 11,
                borderRadius: 15,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={`${item.name}`}
              onPress={() => navigation.navigate(`${item.tag}`)}>
              <MaterialIcons
                name={item.icon}
                size={SIZES.icon}
                color={COLORS.lightblue}
              />
              <View
                style={{
                  height: '40%',
                  width: '100%',
                  paddingHorizontal: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3Low,
                    marginTop: 5,
                    color: COLORS.primary,
                    textAlign: 'center',
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  darken: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
