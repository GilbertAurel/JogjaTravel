import React from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import home from './home';
import discovery from './discovery';
import {SIZES, COLORS} from '../../constants';

const Tabs = createBottomTabNavigator();

const emptyScreen = () => {
  return null;
};

export default function tabs() {
  return (
    <Tabs.Navigator
      initialRouteName="home"
      tabBarOptions={{
        showLabel: false,
        style: styles.tabs,
      }}>
      <Tabs.Screen
        component={home}
        name="home"
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="dashboard"
              size={SIZES.icon}
              color={focused ? COLORS.primary : COLORS.lightblue}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={discovery}
        name="discovery"
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="explore"
              size={SIZES.icon}
              color={focused ? COLORS.primary : COLORS.lightblue}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={emptyScreen}
        name="temp2"
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="map"
              size={SIZES.icon}
              color={focused ? COLORS.primary : COLORS.lightblue}
            />
          ),
        }}
      />
      <Tabs.Screen
        component={emptyScreen}
        name="temp3"
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="person"
              size={SIZES.icon}
              color={focused ? COLORS.primary : COLORS.lightblue}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    height: SIZES.height * 0.08,
    bottom: SIZES.width * 0.03,
    left: SIZES.width * 0.03,
    right: SIZES.width * 0.03,
    borderRadius: 20,
    borderTopWidth: 0,
    elevation: 1,
    backgroundColor: COLORS.white,
  },
});
