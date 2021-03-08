import React, {useRef, useState, useEffect} from 'react';
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
} from '../../../constants';

export default function body({navigation}) {
  const scrollX = new Animated.Value(0);
  const flatListRef = useRef();
  const [category, setCategory] = useState([{title: 'all'}, ...CATEGORIES]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [popularList, setPopularList] = useState(POPULAR);

  // NEWS & UPDATE
  function renderCarouselNews() {
    return (
      <View>
        <Text style={{...FONTS.h3, ...styles.card}}>News & Updates</Text>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{marginTop: SIZES.paddingNormal}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {NEWS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.newsCarousel}
              activeOpacity={1}>
              <View style={styles.newsLocationLabel}>
                <MaterialIcons
                  name="location-on"
                  color={COLORS.white}
                  size={SIZES.icon * 0.5}
                />
                <Text
                  style={{...FONTS.body1, color: COLORS.white, marginLeft: 5}}>
                  {item.location}
                </Text>
              </View>
              <Image
                source={item.cover}
                resizeMode="cover"
                style={styles.newsImage}
              />
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
          }}>
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
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
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
        {renderCarouselNews()}
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
      {renderNews()}
      {renderPopularCategory()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    marginTop: SIZES.paddingWide * 1.5,
    paddingHorizontal: SIZES.paddingWide,
  },
  newsCarousel: {
    height: SIZES.height * 0.25,
    width: SIZES.width,
    alignItems: 'center',
  },
  newsLocationLabel: {
    position: 'absolute',
    elevation: 1,
    top: SIZES.height * 0.25 * 0.05,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsImage: {
    height: '100%',
    width: SIZES.width - SIZES.paddingWide * 2,
    borderRadius: SIZES.height * 0.25 * 0.05,
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
    height: 170,
    width: 120,
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
