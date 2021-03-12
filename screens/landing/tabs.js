import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {fetchDiscovery} from '../../redux/actions';
import home from './home';
import discovery from './discovery';
import bookmark from './bookmark';
import {SIZES, COLORS} from '../../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Tabs = createBottomTabNavigator();

const emptyScreen = () => {
  return null;
};

export function tabs(props) {
  useEffect(() => {
    props.fetchDiscovery();
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
  bindActionCreators({fetchDiscovery}, dispatch);

export default connect(null, mapDispatchToProps)(tabs);

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
