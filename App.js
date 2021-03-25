import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers';

import home from './screens/navigation/tabs';
import attractionPage from './screens/attraction';
import maps from './screens/maps';
import login from './screens/login/login';
import events from './screens/todo/events';
import listingPage from './screens/listing';
import transport from './screens/todo/transport';
import help from './screens/todo/help';

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [logged, setLogged] = useState(false);

  if (!logged) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="home"
            headerMode={{headerShow: false}}
            mode="card">
            <Stack.Screen component={home} name="home" />
            <Stack.Screen component={attractionPage} name="attraction" />
            <Stack.Screen component={events} name="events" />
            <Stack.Screen component={listingPage} name="listing" />
            <Stack.Screen component={transport} name="transport" />
            <Stack.Screen component={maps} name="maps" />
            <Stack.Screen component={help} name="help" />
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
