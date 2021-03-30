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
import listingPage from './screens/listing';
import news from './screens/news';
import events from './screens/events';

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [logged, setLogged] = useState(true);

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
