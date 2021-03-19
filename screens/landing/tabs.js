import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GetLocation from 'react-native-get-location';
import {connect} from 'react-redux';
import {fetchCurrentLocation} from '../../redux/actions';

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchCurrentLocation}, dispatch);

export default connect(null, mapDispatchToProps)(tabs);

const styles = StyleSheet.create({
  tabs: {
    // position: 'absolute',
    height: SIZES.height * 0.09,
    // bottom: SIZES.width * 0.03,
    // left: SIZES.width * 0.03,
    // right: SIZES.width * 0.03,
    // borderRadius: 20,
    // borderTopWidth: 0,
    backgroundColor: COLORS.white,
  },
});
