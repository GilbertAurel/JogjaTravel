import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GetLocation from 'react-native-get-location';
import {connect} from 'react-redux';
import {
  fetchCurrentLocation,
  fetchDiscovery,
  fetchPopularAtractions,
  fetchNews,
} from '../../redux/actions';

import home from './home';
import discovery from './discovery';
import bookmark from './bookmark';
import {SIZES, COLORS} from '../../constants';
import {bindActionCreators} from 'redux';

const Tabs = createBottomTabNavigator();

const emptyScreen = () => {
  return null;
};

export function tabs(props) {
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 1500,
    })
      .then((location) => {
        let latitude = location.latitude;
        let longitude = location.longitude;
        const currentLocation = {
          latitude,
          longitude,
        };
        props.fetchCurrentLocation(currentLocation);
        props.fetchDiscovery();
        props.fetchPopularAtractions();
        props.fetchNews();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
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
          component={bookmark}
          name="bookmark"
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialIcons
                name="bookmark"
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
    </>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {fetchCurrentLocation, fetchDiscovery, fetchPopularAtractions, fetchNews},
    dispatch,
  );

export default connect(null, mapDispatchToProps)(tabs);

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
  },
});
