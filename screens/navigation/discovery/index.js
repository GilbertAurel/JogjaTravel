import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES, ICON} from '../../../constants';
import {categoriesData} from '../../../constants/dummyData/discovery';

const categoryStandardSize = SIZES.width / 3;
const galeryStandardSize = SIZES.width / 1.2;

export default function index() {
  const categoriesScrollX = useRef(new Animated.Value(0)).current;
  const galeriesScrollX = useRef(new Animated.Value(0)).current;
  const [categories, setCategories] = useState([
    {id: -1},
    ...categoriesData,
    {id: -2},
  ]);
  const [galeries, setGaleries] = useState([
    {id: -1},
    ...categoriesData[0].galeries,
    {id: -2},
  ]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [informationButton, setInformationButton] = useState(true);

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity
            style={{
              ...styles.headerButton,
              backgroundColor: informationButton ? COLORS.white : 'transparent',
            }}
            onPress={() => {
              if (!informationButton) {
                setInformationButton(true);
              }
            }}>
            <Text style={styles.headerButtonLabel}>Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.headerButton,
              backgroundColor: !informationButton
                ? COLORS.white
                : 'transparent',
            }}
            onPress={() => {
              if (informationButton) {
                setInformationButton(false);
                galeriesScrollX.setValue(0);
              }
            }}>
            <Text style={styles.headerButtonLabel}>Galery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderBody() {
    if (informationButton) {
      return (
        <View style={styles.bodyContainer}>
          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyTextTitle}>
              {categoriesData[selectedCategory].title}
            </Text>
            <Text style={styles.bodyTextDescription}>
              {categoriesData[selectedCategory].description}
            </Text>
            <TouchableOpacity style={styles.bodyTextButton}>
              <Text style={styles.bodyTextButtonLabel}>Go to details</Text>
              <Image
                source={ICON.right}
                resizeMode="contain"
                style={styles.bodyTextButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.bodyImageContainer}>
          <Animated.FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={galeryStandardSize}
            scrollEventThrottle={16}
            decelerationRate={0}
            data={galeries}
            keyExtractor={(item) => `${item.id}`}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: galeriesScrollX,
                    },
                  },
                },
              ],
              {useNativeDriver: false},
            )}
            renderItem={({item, index}) => {
              const opacity = galeriesScrollX.interpolate({
                inputRange: [
                  (index - 2) * galeryStandardSize,
                  (index - 1) * galeryStandardSize,
                  index * galeryStandardSize,
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              const imageSize = galeriesScrollX.interpolate({
                inputRange: [
                  (index - 2) * galeryStandardSize,
                  (index - 1) * galeryStandardSize,
                  index * galeryStandardSize,
                ],
                outputRange: [
                  SIZES.height / 2,
                  SIZES.height / 1.5,
                  SIZES.height / 2,
                ],
                extrapolate: 'clamp',
              });

              const margin = galeriesScrollX.interpolate({
                inputRange: [
                  (index - 2) * galeryStandardSize,
                  (index - 1) * galeryStandardSize,
                  index * galeryStandardSize,
                ],
                outputRange: [
                  SIZES.height * 0.06,
                  SIZES.height * 0.04,
                  SIZES.height * 0.06,
                ],
                extrapolate: 'clamp',
              });

              if (index == 0 || index == galeries.length - 1) {
                return (
                  <View
                    style={{width: (SIZES.width - galeryStandardSize) / 2}}
                  />
                );
              } else {
                return (
                  <Animated.View
                    opacity={opacity}
                    style={{
                      width: galeryStandardSize,
                      height: imageSize,
                      marginTop: margin,
                      alignItems: 'center',
                      padding: 20,
                      borderRadius: 20,
                    }}>
                    <Image
                      source={item.image}
                      resizeMode="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                      }}
                    />
                    <Text style={styles.bodyImageLabel}>{item.name}</Text>
                    <Text style={styles.bodyImageLocation}>
                      {item.location}
                    </Text>
                  </Animated.View>
                );
              }
            }}
          />
        </View>
      );
    }
  }

  function renderBackground() {
    return (
      <View style={styles.bgContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}
          style={styles.bgGradient}
        />
        <Image
          source={categoriesData[selectedCategory].background}
          resizeMode="cover"
          style={styles.background}
        />
      </View>
    );
  }

  function renderCategories() {
    return (
      <View style={styles.categoriesContainer}>
        <Animated.FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={categoryStandardSize}
          scrollEventThrottle={16}
          decelerationRate={0}
          data={categories}
          keyExtractor={(item) => `${item.id}`}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: categoriesScrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          onMomentumScrollEnd={(event) => {
            let position = (
              event.nativeEvent.contentOffset.x / categoryStandardSize
            ).toFixed(0);
            setSelectedCategory(position);
            setGaleries([
              {id: -1},
              ...categoriesData[position].galeries,
              {id: -2},
            ]);
          }}
          renderItem={({item, index}) => {
            const opacity = categoriesScrollX.interpolate({
              inputRange: [
                (index - 2) * categoryStandardSize,
                (index - 1) * categoryStandardSize,
                index * categoryStandardSize,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const icon = categoriesScrollX.interpolate({
              inputRange: [
                (index - 2) * categoryStandardSize,
                (index - 1) * categoryStandardSize,
                index * categoryStandardSize,
              ],
              outputRange: [30, 50, 30],
              extrapolate: 'clamp',
            });

            const fontSize = categoriesScrollX.interpolate({
              inputRange: [
                (index - 2) * categoryStandardSize,
                (index - 1) * categoryStandardSize,
                index * categoryStandardSize,
              ],
              outputRange: [0, 18, 0],
              extrapolate: 'clamp',
            });

            if (index == 0 || index == categories.length - 1) {
              return <View style={{width: categoryStandardSize}} />;
            } else {
              return (
                <Animated.View
                  opacity={opacity}
                  style={{
                    ...styles.animatedCategoriesContainer,
                    width: categoryStandardSize,
                  }}>
                  <Animated.Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                      width: icon,
                      height: icon,
                      ...styles.categoriesImage,
                    }}
                  />
                  <Animated.Text
                    style={{
                      ...FONTS.h1,
                      fontSize: fontSize,
                      ...styles.categoriesLabel,
                    }}>
                    {item.name}
                  </Animated.Text>
                </Animated.View>
              );
            }
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderBackground()}
      {renderHeader()}
      {renderBody()}
      {renderCategories()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: SIZES.height,
    width: SIZES.width,
  },
  headerContainer: {
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  headerButtonContainer: {
    width: SIZES.width * 0.7,
    height: 30,
    borderRadius: 30,
    backgroundColor: COLORS.mediumgray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    width: SIZES.width * 0.344,
    height: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonLabel: {
    ...FONTS.body1,
    color: COLORS.primary,
  },
  bgContainer: {
    height: SIZES.height,
    position: 'absolute',
    backgroundColor: COLORS.black,
    elevation: -1,
  },
  bgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SIZES.height,
    width: SIZES.width,
    elevation: 1,
  },
  background: {
    height: SIZES.height,
    width: SIZES.width,
  },
  bodyContainer: {
    flex: 1,
  },
  bodyImageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyImageLabel: {
    position: 'absolute',
    right: 50,
    bottom: 60,
    ...FONTS.h2,
    color: COLORS.white,
  },
  bodyImageLocation: {
    position: 'absolute',
    right: 50,
    bottom: 40,
    ...FONTS.h3,
    color: COLORS.white,
  },
  bodyTextContainer: {
    position: 'absolute',
    width: SIZES.width * 0.7,
    left: SIZES.width * 0.1,
    bottom: SIZES.height * 0.22,
    elevation: 2,
  },
  bodyTextTitle: {
    ...FONTS.title,
    color: COLORS.white,
    marginBottom: SIZES.paddingWide,
  },
  bodyTextDescription: {
    ...FONTS.body1,
    color: COLORS.white,
    marginBottom: SIZES.paddingNormal,
  },
  bodyTextButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyTextButtonLabel: {
    ...FONTS.body1,
    color: COLORS.white,
  },
  bodyTextButtonIcon: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  categoriesContainer: {
    position: 'absolute',
    width: SIZES.width,
    bottom: 60,
  },
  categoriesImage: {
    tintColor: COLORS.white,
  },
  categoriesLabel: {
    color: COLORS.white,
  },
  animatedCategoriesContainer: {
    height: 130,
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
