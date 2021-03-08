import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS, FONTS, SIZES} from '../../constants';

const initialLocation = {
  latitude: -7.782520944656917,
  longitude: 110.36699797702586,
  latitudeDelta: 0.00922 * 2,
  longitudeDelta: 0.00421 * 2,
};

export default function index({navigation}) {
  const mapRef = useRef();
  const [myLocation, setMyLocation] = useState(initialLocation);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 1500,
    })
      .then((location) => {
        let latitude = location.latitude;
        let longitude = location.longitude;

        setMyLocation({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.00922 * 2,
          longitudeDelta: 0.00421 * 2,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderMap() {
    const currentLocationMarker = () => {
      const gps = {
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
      };

      return (
        <Marker coordinate={gps}>
          <View style={styles.marker}>
            <View style={styles.markerPin}></View>
          </View>
        </Marker>
      );
    };

    return (
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={myLocation}
          ref={mapRef}
          style={{width: SIZES.width, height: SIZES.height + 40}}>
          {currentLocationMarker()}
        </MapView>
      </View>
    );
  }

  function renderSearchBar() {
    const onRecenter = () => {
      mapRef.current.animateToRegion(myLocation);
    };

    return (
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={SIZES.icon}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="search your destination.."
          style={styles.searchBar}
        />
        <TouchableOpacity
          style={styles.recenterButton}
          onPress={() => onRecenter()}>
          <MaterialIcons
            name="gps-fixed"
            color={COLORS.black}
            size={SIZES.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMapFunction() {
    return (
      <View style={styles.mapFunctionContainer}>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Text style={{...FONTS.body1, color: COLORS.white, marginLeft: 10}}>
            My Saved Location
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={{flex: 1}}>
        {renderMap()}
        {renderSearchBar()}
        {renderMapFunction()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  markerPin: {
    height: 12,
    width: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  searchBarContainer: {
    position: 'absolute',
    top: SIZES.paddingWide * 1.5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: SIZES.icon * 1.5,
    width: SIZES.width * 0.7,
    marginHorizontal: SIZES.paddingNormal,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius,
    elevation: 2,
    backgroundColor: COLORS.white,
    ...FONTS.body2,
    textAlign: 'center',
  },
  backButton: {
    height: SIZES.icon * 1.5,
    width: SIZES.icon * 1.5,
    borderRadius: SIZES.icon,
    elevation: 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recenterButton: {
    width: SIZES.icon * 1.5,
    height: SIZES.icon * 1.5,
    borderRadius: SIZES.icon,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  mapFunctionContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: SIZES.paddingWide,
    alignItems: 'center',
  },
  bookmarkButton: {
    width: SIZES.width * 0.5,
    height: SIZES.icon * 1.5,
    borderRadius: SIZES.icon,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: COLORS.primary,
  },
});
