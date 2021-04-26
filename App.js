import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers';
import firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import {firebaseConfig} from './config';

import home from './screens/navigation/tabs';
import attractionPage from './screens/attraction';
import maps from './screens/maps';
import login from './screens/login/login';
import listingPage from './screens/listing';
import news from './screens/news';
import events from './screens/events';
import help from './screens/help';
import tourGuide from './screens/tourguide';
import transport from './screens/transport';
import {FONTS, IMAGE, SIZES} from './constants';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [logged, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLogged(false);
      } else {
        setLoaded(true);
        setLogged(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={IMAGE.LOGO}
          resizeMode="contain"
          style={{
            height: SIZES.height * 0.1,
            width: SIZES.width * 0.3,
            marginTop: SIZES.height * 0.3,
          }}
        />
      </View>
    );
  } else {
    if (logged) {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="home"
              headerMode={{headerShow: false}}
              mode="card">
              <Stack.Screen component={home} name="home" />
              <Stack.Screen component={attractionPage} name="attraction" />
              <Stack.Screen component={listingPage} name="listing" />
              <Stack.Screen component={news} name="news" />
              <Stack.Screen component={events} name="events" />
              <Stack.Screen component={maps} name="maps" />
              <Stack.Screen component={help} name="help" />
              <Stack.Screen component={transport} name="transport" />
              <Stack.Screen component={tourGuide} name="tour" />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    } else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="logim"
              headerMode={{headerShow: false}}
              mode="card">
              <Stack.Screen component={login} name="login" />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
  }
}
