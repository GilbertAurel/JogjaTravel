import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SIZES, IMAGE, COLORS, FONTS, SERVER} from '../../constants';

export default function index({route, navigation}) {
  const bgScrollY = useRef(new Animated.Value(0)).current;

  const [news, setNews] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const bgTranslateY = bgScrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -30],
  });
  const topBarOpacity = bgScrollY.interpolate({
    inputRange: [100, 200],
    outputRange: [0, 1],
  });

  useEffect(() => {
    const {news} = route.params;
    setNews(news);
    setLoaded(true);
  }, []);

  function renderBackground() {
    return (
      <Animated.Image
        source={{uri: `${SERVER}/${news.imageURL}`}}
        resizeMode="cover"
        style={{top: bgTranslateY, ...styles.background}}
      />
    );
  }

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
        <Text style={styles.topBarTitle}>News & Update</Text>
      </Animated.View>
    );
  }

  function renderBody() {
    const replacement = {'\\n\\n': '\n\n', '\\t': '\t'};
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
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
        )}
        style={styles.container}>
        <View style={styles.bodyContainer}>
          {/* headline */}
          <Image
            source={IMAGE.bakpiaTugu}
            resizeMode="cover"
            style={styles.bodyProfileImg}
          />
          <Text style={styles.bodyHeadline}>{news.headline}</Text>

          <Text style={styles.bodyDate}>{news.date}</Text>

          {/* content */}
          <Text style={styles.bodyContent}>
            {news.body.replace(
              /\\n\\n|\\t/g,
              (character) => replacement[character],
            )}
          </Text>
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

  if (!loaded) {
    return <View></View>;
  } else {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        {renderBackground()}
        {renderBody()}
        {renderTopBar()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    height: SIZES.height * 0.5,
    width: SIZES.width,
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
    elevation: 2,
  },
  topBarTitle: {
    ...FONTS.h1,
    color: COLORS.black,
  },
  bodyContainer: {
    width: SIZES.width,
    minHeight: SIZES.height - 400,
    marginTop: 400,
    paddingTop: SIZES.paddingWide * 4,
    paddingBottom: SIZES.paddingWide * 4,
    paddingHorizontal: SIZES.paddingWide * 1.5,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  bodyHeadline: {
    width: '70%',
    textAlign: 'center',
    ...FONTS.h1,
  },
  bodyProfileImg: {
    position: 'absolute',
    top: -50,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },
  bodyDate: {
    marginTop: SIZES.paddingNormal,
    marginBottom: SIZES.paddingWide * 2,
    ...FONTS.body2,
  },
  bodyContent: {
    width: '100%',
    textAlign: 'justify',
    ...FONTS.body1,
  },
  bodyBackButton: {
    position: 'absolute',
    top: 40,
    left: SIZES.paddingWide * 1.5,
    height: SIZES.icon * 2,
    width: SIZES.icon * 2,
  },
});
