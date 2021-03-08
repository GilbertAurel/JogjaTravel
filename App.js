import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import home from './screens/landing/tabs';
import attraction from './screens/attraction';
import maps from './screens/maps';
import events from './screens/todo/events';
import tour from './screens/todo/tour';
import transport from './screens/todo/transport';
import help from './screens/todo/help';

import {MENU} from './constants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        headerMode={{headerShow: false}}
        mode="card">
        <Stack.Screen component={home} name="home" />
        <Stack.Screen component={attraction} name="attraction" />
        <Stack.Screen component={events} name={`${MENU[0].tag}`} />
        <Stack.Screen component={tour} name={`${MENU[1].tag}`} />
        <Stack.Screen component={transport} name={`${MENU[2].tag}`} />
        <Stack.Screen component={maps} name={`${MENU[3].tag}`} />
        <Stack.Screen component={help} name={`${MENU[4].tag}`} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
