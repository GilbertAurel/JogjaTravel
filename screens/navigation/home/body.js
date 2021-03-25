import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  COLORS,
  FONTS,
  SIZES,
  NEWS,
  CATEGORIES,
  POPULAR,
  MENU,
} from '../../../constants';

export default function body({navigation}) {
  const scrollX = new Animated.Value(0);
  const flatListRef = useRef();
  const [category, setCategory] = useState([{title: 'all'}, ...CATEGORIES]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [popularList, setPopularList] = useState(POPULAR);

  // QUICK MENU
  function renderQuickMenu() {
    const renderItem = ({item}) => {
      return (
        <View>
          {item.map((menu, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickMenuButton}
              onPress={() => navigation.navigate(menu.tag)}>
              <MaterialIcons
                name={menu.icon}
                size={SIZES.icon}
                color={COLORS.primary}
                style={styles.quickMenuIcon}
              />
              <Text style={styles.quickMenuLabel}>{menu.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };
    return (
      <View style={styles.quickMenuContainer}>
        <Text style={styles.quickMenuTitle}>Quick menu</Text>
        <FlatList
          data={MENU}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          ListHeaderComponent={() => {
            return <View style={{width: SIZES.paddingWide}} />;
          }}
          ListFooterComponent={() => {
            return <View style={{width: SIZES.paddingWide}} />;
          }}
        />
      </View>
    );
  }

  // NEWS & UPDATE
  function renderNewsContent() {
    return (
      <View>
        <Text style={styles.newsTitle}>News & Updates</Text>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={styles.newsAnimatedScrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {NEWS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.newsCarousel}
              activeOpacity={1}>
              <View style={styles.newsLocationLabelContainer}>
                <MaterialIcons
                  name="location-on"
                  color={COLORS.white}
                  size={SIZES.icon * 0.5}
                />
                <Text style={styles.newsLocationLabelText}>
                  {item.location}
                </Text>
              </View>
              <Image
                source={item.cover}
                resizeMode="cover"
                style={styles.newsImage}
              />
              <View style={styles.newsHeadlineContainer}>
                <Text style={styles.newsHeadline}>{item.headline}</Text>
                <Text style={styles.newsSubHeadline}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque, porro! Fugit quisquam commodi enim laudantium?
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{height: 30}}>
        <View style={styles.dotsContainer}>
          {NEWS.map((item, index) => {
            const dotOpacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSizeHeight = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [5, 6, 5],
              extrapolate: 'clamp',
            });

            const dotSizeWidth = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [5, 15, 5],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.lightblue, COLORS.primary, COLORS.lightblue],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                opacity={dotOpacity}
                style={{
                  ...styles.dotsAnimatedView,
                  width: dotSizeWidth,
                  height: dotSizeHeight,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderNews() {
    return (
      <View>
        {renderNewsContent()}
        {renderDots()}
      </View>
    );
  }

  // POPULAR DESTINATION
  function renderPopularCategory() {
    const onClickCategory = (item) => {
      const newPopularList = POPULAR.filter((a) =>
        a.category.includes(item.title),
      );

      if (item.title == 'all') setPopularList(POPULAR);
      else setPopularList(newPopularList);

      flatListRef.current.scrollToIndex({index: 0, animated: false});
      setSelectedCategory(item.title);
    };

    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            ...styles.popularCategory,
            backgroundColor:
              item.title == selectedCategory ? COLORS.primary : COLORS.white,
          }}
          onPress={() => onClickCategory(item)}>
          <Text
            style={{
              ...FONTS.body1,
              color:
                item.title == selectedCategory ? COLORS.white : COLORS.black,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{...styles.card, marginBottom: SIZES.height * 0.12}}>
        <Text style={{...FONTS.h3}}>Popular Destinations</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={category}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.title}`}
        />
        {renderPopularList()}
      </View>
    );
  }

  function renderPopularList() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() =>
            navigation.navigate('attraction', {
              item: item,
            })
          }
          activeOpacity={1}>
          <Image
            source={item.image}
            resizeMode="cover"
            style={styles.popularList}
          />
          <Text style={styles.popularListLabel}>{item.title}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={popularList}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderQuickMenu()}
      {renderNews()}
      {renderPopularCategory()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  card: {
    marginTop: SIZES.paddingWide * 2,
    paddingHorizontal: SIZES.paddingWide * 1.5,
  },
  quickMenuContainer: {
    marginTop: SIZES.paddingWide * 1.5,
    elevation: 1,
  },
  quickMenuTitle: {
    ...FONTS.h3,
    marginTop: SIZES.paddingWide * 2,
    paddingHorizontal: SIZES.paddingWide * 1.5,
    marginBottom: SIZES.paddingWide,
  },
  quickMenuButton: {
    width: 180,
    height: 50,
    marginBottom: SIZES.paddingNormal,
    marginHorizontal: SIZES.paddingNormal * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 2.0,
    elevation: 1,
  },
  quickMenuIcon: {
    marginLeft: SIZES.paddingWide,
  },
  quickMenuLabel: {
    ...FONTS.body1,
    marginLeft: SIZES.paddingNormal,
  },
  newsCarousel: {
    width: SIZES.width,
    alignItems: 'center',
  },
  newsTitle: {
    ...FONTS.h3,
    marginTop: SIZES.paddingWide * 2,
    paddingHorizontal: SIZES.paddingWide * 1.5,
  },
  newsAnimatedScrollView: {
    marginTop: SIZES.paddingNormal,
  },
  newsLocationLabelContainer: {
    position: 'absolute',
    elevation: 1,
    top: SIZES.height * 0.25 * 0.05,
    left: SIZES.width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsLocationLabelText: {
    ...FONTS.body1,
    color: COLORS.white,
    marginLeft: 5,
  },
  newsImage: {
    height: 170,
    width: SIZES.width - SIZES.paddingWide * 3,
    borderTopLeftRadius: SIZES.height * 0.25 * 0.05,
    borderTopRightRadius: SIZES.height * 0.25 * 0.05,
  },
  newsHeadlineContainer: {
    width: SIZES.width - SIZES.paddingWide * 3,
    marginTop: SIZES.paddingNormal,
  },
  newsHeadline: {
    ...FONTS.h2,
  },
  newsSubHeadline: {
    ...FONTS.body2,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  dotsAnimatedView: {
    borderRadius: SIZES.radius,
    marginHorizontal: 6,
  },
  popularCategory: {
    marginVertical: 10,
    marginRight: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  popularList: {
    height: 200,
    width: 150,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
  },
  popularListLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    ...FONTS.body2,
    color: COLORS.white,
  },
});
