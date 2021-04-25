import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Animated,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS, FONTS, IMAGE, SERVER, SIZES} from '../../constants';
import {connect} from 'react-redux';
import {getDistance} from 'geolib';

const initialLocation = {
  latitude: -7.782520944656917,
  longitude: 110.36699797702586,
  latitudeDelta: 0.00922 * 2,
  longitudeDelta: 0.00421 * 2,
};

export function index(props) {
  const {navigation, savedAttraction} = props;
  const mapRef = useRef();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [myLocation, setMyLocation] = useState(initialLocation);
  const [attraction, setAttraction] = useState(null);

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
  });

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

  useEffect(() => {
    setAttraction(savedAttraction);
  }, [props]);

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
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={myLocation}
          ref={mapRef}
          style={{...styles.map}}>
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

  function renderShowAttraction() {
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={styles.showScroll}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        {renderMap()}
        <View style={styles.showContainer}>
          <View style={styles.showScrollIndicator} />

          {/* title */}
          {attraction.length >= 1 ? (
            <Animated.Text style={{...styles.showLabel, opacity: titleOpacity}}>
              Saved Attractions
            </Animated.Text>
          ) : (
            <Animated.Text style={{...styles.showLabel, opacity: titleOpacity}}>
              No Saved Attractions
            </Animated.Text>
          )}

          {/* item list */}
          {attraction.map((item, index) => {
            const distance = () => {
              const kilometer =
                getDistance(myLocation, item.coordinate) * 0.001;

              if (kilometer > 50) return '50km+';
              else return `${Math.floor(kilometer)}km`;
            };

            return (
              <View key={index} style={styles.attractionContainer}>
                {/* Image */}
                <TouchableOpacity style={styles.attractionImageContainer}>
                  <Image
                    source={{uri: `${SERVER}/${item.imageURL}`}}
                    resizeMode="cover"
                    style={styles.attractionImage}
                  />
                </TouchableOpacity>

                {/* Details */}
                <View style={styles.attractionDetails}>
                  <Text style={styles.attractionTitle}>{item.title}</Text>
                  <Text style={styles.attractionLocation}>{item.address}</Text>
                  <View style={styles.attractionRateContainer}>
                    <View style={styles.attractionRating}>
                      <MaterialIcons
                        name="star"
                        size={SIZES.icon * 0.7}
                        color={COLORS.yellow}
                      />
                      <Text style={styles.attractionSubtitle}>
                        {item.rating}
                      </Text>
                    </View>
                    <View style={styles.attractionDistance}>
                      <MaterialIcons
                        name="directions-run"
                        size={SIZES.icon * 0.7}
                        color={COLORS.primary}
                      />
                      <Text style={styles.attractionSubtitle}>
                        {distance()}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Functions */}
                <View style={styles.attractionButtonContainer}>
                  <TouchableOpacity style={styles.attractionButton}>
                    <MaterialIcons
                      name="room"
                      size={SIZES.icon}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.attractionButton}>
                    <MaterialIcons
                      name="directions"
                      size={SIZES.icon}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  if (!attraction) {
    return <View></View>;
  } else {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.container}>
          {renderShowAttraction()}
          {renderSearchBar()}
        </View>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  savedAttraction: store.attractionState.savedAttraction,
});

export default connect(mapStateToProps, null)(index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    position: 'absolute',
    elevation: 1,
    top: 0,
  },
  map: {
    width: SIZES.width,
    height: SIZES.height,
  },
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
  showScroll: {},
  showContainer: {
    elevation: 2,
    width: SIZES.width,
    marginTop: SIZES.height - 60,
    paddingBottom: SIZES.paddingWide,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.lightgray,
  },
  showLabel: {
    marginLeft: '5%',
    marginBottom: SIZES.paddingNormal,
    ...FONTS.h1,
  },
  attractionContainer: {
    height: 150,
    width: '90%',
    paddingHorizontal: SIZES.paddingNormal,
    marginBottom: SIZES.paddingWide,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2.0,
    elevation: 2,
  },
  attractionImageContainer: {
    height: 120,
    width: 120,
    borderRadius: 10,
    elevation: 2,
  },
  attractionImage: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  attractionDetails: {
    flex: 1,
    height: 120,
    paddingVertical: SIZES.paddingWide,
    marginLeft: SIZES.paddingWide,
  },
  attractionRateContainer: {
    flexDirection: 'row',
    marginTop: SIZES.paddingNormal,
  },
  attractionRating: {
    flexDirection: 'row',
    marginRight: SIZES.paddingNormal,
  },
  attractionDistance: {
    flexDirection: 'row',
  },
  attractionTitle: {
    ...FONTS.h3,
  },
  attractionSubtitle: {
    ...FONTS.body2,
  },
  attractionLocation: {
    ...FONTS.body2,
  },
  attractionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showScrollIndicator: {
    width: '40%',
    height: 5,
    marginTop: SIZES.paddingWide * 1.5,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginBottom: SIZES.paddingWide * 2.5,
    alignSelf: 'center',
  },
  attractionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.paddingNormal,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2.0,
    elevation: 1,
  },
  searchBarContainer: {
    position: 'absolute',
    top: SIZES.paddingWide * 2.5,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    height: SIZES.icon * 1.5,
    width: SIZES.width * 0.7,
    marginHorizontal: SIZES.paddingNormal,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius,
    elevation: 1,
    backgroundColor: COLORS.white,
    ...FONTS.body2,
    textAlign: 'center',
  },
  backButton: {
    height: SIZES.icon * 1.5,
    width: SIZES.icon * 1.5,
    borderRadius: SIZES.icon,
    elevation: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recenterButton: {
    width: SIZES.icon * 1.5,
    height: SIZES.icon * 1.5,
    borderRadius: SIZES.icon,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
