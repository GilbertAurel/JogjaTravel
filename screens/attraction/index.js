import React, {useRef} from 'react';
import {StatusBar, ScrollView, TouchableOpacity, Text} from 'react-native';

import LandingPage from './landingPage';
import DetailPage from './detailPage';

export default function index({route}) {
  const {item} = route.params;
  const scrollRef = useRef();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView
        pagingEnabled={true}
        snapToAlignment="center"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <LandingPage item={item} scrollRef={scrollRef} />
        <DetailPage item={item} />
      </ScrollView>
    </>
  );
}
