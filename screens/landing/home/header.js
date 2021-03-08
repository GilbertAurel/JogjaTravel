import React from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS, FONTS, SIZES, MENU} from '../../../constants';

export default function header({navigation}) {
  function renderTitle() {
    return (
      <View
        style={{
          marginTop: SIZES.StatusBar * 3,
          paddingHorizontal: SIZES.paddingWide,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h1,
            width: SIZES.width * 0.75,
            color: COLORS.white,
          }}>
          Are you ready to start your adventure?
        </Text>
        <TouchableOpacity
          style={{
            width: SIZES.icon * 1.5,
            height: SIZES.icon * 1.5,
            borderRadius: SIZES.radius,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.secondary,
          }}>
          <MaterialIcons
            name="notifications-none"
            size={SIZES.icon}
            color={COLORS.white}
          />
        </TouchableOpacity>
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
    <View>
      {renderTitle()}
      {renderSearchBar()}
      {renderCategories()}
    </View>
  );
}
