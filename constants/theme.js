import {Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

export const GOOGLE_API_KEY = 'AIzaSyCQcVjKLEZh4tYHNxxYgB6cL9iWdJKcT6o';
export const SERVER = 'http://10.0.2.2:3000';

export const SIZES = {
  width: width,
  height: height,
  StatusBar: StatusBar.currentHeight,
  paddingNormal: 10,
  paddingWide: 20,
  radius: 30,

  icon: 26,
  title: 45,
  h1: 28,
  h2: 22,
  h3: 20,
  body1: 18,
  body2: 16,
  body3: 14,
};

export const COLORS = {
  primary: '#276678',
  secondary: '#1687A7',

  lightblue: '#D3E0EA',
  lightgray: '#FAFAFA',
  mediumgray: '#CCCCCC',

  gray: '#636363',
  white: '#fff',
  black: '#000',
  yellow: '#FFD700',
};

export const FONTS = {
  title: {
    fontFamily: 'whitneysemibold',
    fontSize: SIZES.title,
    lineHeight: 50,
  },
  h1: {fontFamily: 'whitneysemibold', fontSize: SIZES.h1, lineHeight: 30},
  h2: {fontFamily: 'whitneymedium', fontSize: SIZES.h2, lineHeight: 22},
  h3: {fontFamily: 'whitneymedium', fontSize: SIZES.h3, lineHeight: 22},

  body1: {fontFamily: 'whitneymedium', fontSize: SIZES.body1, lineHeight: 20},
  body2: {fontFamily: 'whitneymedium', fontSize: SIZES.body2, lineHeight: 20},
  body3: {fontFamily: 'whitneymedium', fontSize: SIZES.body3, lineHeight: 20},

  body3Low: {
    fontFamily: 'whitneymedium',
    fontSize: SIZES.body3,
    lineHeight: 15,
  },
};

const appTheme = {
  SIZES: SIZES,
  COLORS: COLORS,
  FONTS: FONTS,
  GOOGLE_API_KEY: GOOGLE_API_KEY,
  SERVER: SERVER,
};

export default appTheme;
