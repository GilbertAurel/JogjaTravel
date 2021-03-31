import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image,
  ScrollView,
  Linking,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {fetchEvents} from '../../redux/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {COLORS, FONTS, IMAGE, SERVER, SIZES} from '../../constants';

const EVENT_DUMMY = [
  {
    category: 'art',
  },
  {
    category: 'art',
  },
  {
    category: 'art',
  },
  {
    category: 'art',
  },
  {
    category: 'art',
  },
  {
    category: 'sports',
  },
  {
    category: 'sports',
  },
];

export function index(props) {
  const {navigation, events} = props;
  const bgScrollY = useRef(new Animated.Value(0)).current;
  const [buttonActive, setButtonActive] = useState('');
  const [eventList, setEventList] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    props.fetchEvents();
  }, []);

  useEffect(() => {
    setEventList(events);
    setLoaded(true);
  }, [props]);

  const opacity = bgScrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
  });

  const bgTranslateY = bgScrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -30],
  });

  const topBarOpacity = bgScrollY.interpolate({
    inputRange: [100, 300],
    outputRange: [0, 1],
  });

  function renderTopBar() {
    return (
      <Animated.View opacity={topBarOpacity} style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={SIZES.icon}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Events</Text>
      </Animated.View>
    );
  }

  function renderBackground() {
    return (
      <View style={styles.backgroundContainer}>
        <Animated.Image
          source={IMAGE.HEADER_EVENT}
          resizeMode="cover"
          style={{...styles.background, top: bgTranslateY}}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}
          style={styles.backgroundDarken}
        />
      </View>
    );
  }

  function renderSelection() {
    return (
      <Animated.View opacity={opacity} style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => {
            setButtonActive('art');
            const newEventList = events.filter((item) =>
              item.category.includes('art'),
            );
            setEventList(newEventList);
          }}>
          <Text
            style={{
              ...styles.selectionLabel,
              color: buttonActive == 'art' ? COLORS.white : COLORS.gray,
              borderWidth: buttonActive == 'art' ? 1 : 0,
              borderBottomColor: COLORS.secondary,
            }}>
            Art
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => {
            setButtonActive('culinary');
            const newEventList = events.filter((item) =>
              item.category.includes('culinary'),
            );
            setEventList(newEventList);
          }}>
          <Text
            style={{
              ...styles.selectionLabel,
              color: buttonActive == 'culinary' ? COLORS.white : COLORS.gray,
              borderWidth: buttonActive == 'culinary' ? 1 : 0,
              borderBottomColor: COLORS.secondary,
            }}>
            Culinary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => {
            setButtonActive('sports');
            const newEventList = events.filter((item) =>
              item.category.includes('sports'),
            );
            setEventList(newEventList);
          }}>
          <Text
            style={{
              ...styles.selectionLabel,
              color: buttonActive == 'sports' ? COLORS.white : COLORS.gray,
              borderWidth: buttonActive == 'sports' ? 1 : 0,
              borderBottomColor: COLORS.secondary,
            }}>
            Sports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => {
            setButtonActive('traditional');
            const newEventList = events.filter((item) =>
              item.category.includes('traditional'),
            );
            setEventList(newEventList);
          }}>
          <Text
            style={{
              ...styles.selectionLabel,
              color: buttonActive == 'traditional' ? COLORS.white : COLORS.gray,
              borderWidth: buttonActive == 'traditional' ? 1 : 0,
              borderBottomColor: COLORS.secondary,
            }}>
            Traditional
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  function renderBody() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bodyScrollContainer}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: bgScrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <View style={styles.bodyContainer}>
          <View style={styles.bodyScrollIndicator} />
          {eventList.map((item, index) => {
            const linkHandler = () => {
              Linking.canOpenURL(item.detailURL)
                .then((supported) => {
                  if (supported) {
                    Linking.openURL(item.detailURL);
                  } else {
                    alert("Can't access url");
                  }
                })
                .catch(() => {
                  alert("Can't access url");
                });
            };

            return (
              <View key={index} style={styles.bodyEventContainer}>
                <Image
                  source={{uri: `${SERVER}/${item.imageURL}`}}
                  resizeMode="contain"
                  style={styles.bodyEventImg}
                />
                <View>
                  <Text style={styles.bodyEventTitle}>{item.title}</Text>
                  <Text style={styles.bodyEventDate}>{item.date}</Text>
                  <Text style={styles.bodyEventLocation}>{item.location}</Text>
                  <TouchableOpacity
                    style={styles.bodyEventButtonContainer}
                    onPress={() => linkHandler()}>
                    <Text style={styles.bodyEventButtonLabel}>Go to page</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.bodyBackButton}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={SIZES.icon}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (!loaded || !eventList) return <View></View>;
  else {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        {renderBackground()}
        {renderBody()}
        {renderSelection()}
        {renderTopBar()}
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  events: store.eventState.event,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchEvents}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    width: SIZES.width,
    paddingTop: SIZES.paddingWide,
    paddingHorizontal: SIZES.paddingWide * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 2.0,
    elevation: 3,
  },
  topBarTitle: {
    ...FONTS.h1,
    color: COLORS.black,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    height: SIZES.height * 0.6,
    width: SIZES.width,
  },
  backgroundDarken: {
    position: 'absolute',
    top: 0,
    elevation: 0,
    height: SIZES.height * 0.6,
    width: SIZES.width,
  },
  selectionContainer: {
    position: 'absolute',
    top: 430,
    height: 60,
    elevation: 1,
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selectionButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionLabel: {
    ...FONTS.h3,
  },
  bodyScrollContainer: {
    elevation: 2,
  },
  bodyScrollIndicator: {
    width: '40%',
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginBottom: SIZES.paddingWide * 2.5,
    alignSelf: 'center',
  },
  bodyContainer: {
    marginTop: 500,
    paddingTop: SIZES.paddingWide * 1.5,
    paddingBottom: SIZES.paddingWide * 4,
    minHeight: SIZES.height - 500,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.lightgray,
  },
  bodyEventContainer: {
    width: '90%',
    height: 180,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.paddingWide,
    paddingHorizontal: SIZES.paddingWide * 1.5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2.0,
    elevation: 2,
  },
  bodyEventImg: {
    height: '80%',
    width: 120,
    marginRight: SIZES.paddingWide,
    borderRadius: 10,
    backgroundColor: COLORS.lightgray,
  },
  bodyEventTitle: {
    ...FONTS.h2,
  },
  bodyEventDate: {
    ...FONTS.body2,
  },
  bodyEventLocation: {
    ...FONTS.body2,
  },
  bodyEventButtonContainer: {
    width: '80%',
    marginTop: SIZES.paddingNormal,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyEventButtonLabel: {
    ...FONTS.body2,
    color: COLORS.white,
  },
  bodyBackButton: {
    position: 'absolute',
    top: 40,
    left: SIZES.paddingWide * 1.5,
    height: SIZES.icon * 2,
    width: SIZES.icon * 2,
  },
});
