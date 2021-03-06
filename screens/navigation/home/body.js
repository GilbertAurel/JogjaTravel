import React, {useEffect, useRef, useState} from 'react';
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTS,
  SIZES,
  CATEGORIES,
  MENU,
  SERVER,
} from '../../../constants';

export default function body(props) {
  const scrollX = new Animated.Value(0);
  const flatListRef = useRef();
  const {navigation} = props;

  const [category, setCategory] = useState([{title: 'all'}, ...CATEGORIES]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [popularList, setPopularList] = useState(null);
  const [showSelected, setShowSelected] = useState(null);
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    const {popularAttractions, attractions, news} = props;

    if (popularAttractions && attractions) {
      const newPopular = attractions.filter((item) =>
        popularAttractions.some(
          (popularItem) => popularItem.attraction == item.id,
        ),
      );

      setPopularList(newPopular);
      setShowSelected(newPopular);
      setNewsList(news);
    }
  }, [props]);

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
    if (!newsList) {
      return (
        <View style={{marginBottom: 30}}>
          <Text style={styles.newsTitle}>News & Updates</Text>
          <SkeletonPlaceholder>
            <View style={styles.newsAnimatedScrollView}>
              <View style={styles.newsCarousel}>
                <View style={styles.newsImage}></View>
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      );
    } else {
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
            {newsList.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.newsCarousel}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('news', {news: item})}>
                <Image
                  source={{uri: `${SERVER}/${item.imageURL}`}}
                  resizeMode="cover"
                  style={styles.newsImage}
                />
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 2}}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                  style={{...styles.newsImage, ...styles.newsDarkenBackground}}
                />
                <Text style={styles.newsHeadline}>{item.headline}</Text>
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
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        </View>
      );
    }
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    if (!newsList) return <View></View>;
    else {
      return (
        <View style={{height: 30}}>
          <View style={styles.dotsContainer}>
            {newsList.map((item, index) => {
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
                outputRange: [COLORS.primary, COLORS.primary, COLORS.primary],
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
      const newPopularList = popularList.filter((doc) =>
        doc.category.includes(item.title),
      );

      if (item.title == 'all') setShowSelected(popularList);
      else setShowSelected(newPopularList);

      if (!newPopularList)
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
          onPress={() => onClickCategory(item)}
          activeOpacity={0.8}>
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
          style={styles.popularListContainer}
          onPress={() =>
            navigation.navigate('attraction', {
              item: item,
            })
          }
          activeOpacity={0.8}>
          <Image
            source={{uri: `${SERVER}/${item.imageURL}`}}
            resizeMode="cover"
            style={styles.popularList}
          />
          <Text
            style={styles.popularListLabel}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.popularListRating}>
            <MaterialIcons
              name="star"
              size={SIZES.body1}
              color={COLORS.yellow}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    if (showSelected) {
      return (
        <View style={styles.popularListViewContainer}>
          <FlatList
            horizontal
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            data={showSelected}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      );
    } else {
      return (
        <SkeletonPlaceholder>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 150,
                height: 200,
                marginRight: 10,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                width: 150,
                height: 200,
                marginRight: 10,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                width: 150,
                height: 200,
                marginRight: 10,
                borderRadius: 10,
              }}></View>
          </View>
        </SkeletonPlaceholder>
      );
    }
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
    ...FONTS.body2,
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
    bottom: '5%',
    right: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsLocationLabelText: {
    ...FONTS.body1,
    color: COLORS.white,
    marginLeft: 5,
  },
  newsImage: {
    height: 220,
    width: SIZES.width - SIZES.paddingWide * 3,
    borderRadius: SIZES.height * 0.25 * 0.05,
  },
  newsDarkenBackground: {
    position: 'absolute',
  },
  newsHeadline: {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    width: '50%',
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h2,
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
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 2.0,
    elevation: 1,
  },
  popularListViewContainer: {
    minHeight: 240,
  },
  popularListContainer: {
    width: 150,
    marginRight: 10,
  },
  popularList: {
    height: 200,
    width: 150,
    borderRadius: 10,
  },
  popularListLabel: {
    flex: 1,
    width: '70%',
    marginTop: SIZES.paddingNormal * 0.5,
    ...FONTS.body1,
    color: COLORS.black,
  },
  popularListRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
