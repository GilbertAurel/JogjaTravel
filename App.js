import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import home from './screens/landing/tabs';
import attraction from './screens/attraction';

const Stack = createStackNavigator();

const emptyScreen = () => {
  return null;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode={{headerShow: false}}>
        <Stack.Screen component={home} name="home" />
        <Stack.Screen component={attraction} name="attraction" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
