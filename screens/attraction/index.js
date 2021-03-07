import React from 'react';
import {StatusBar, ScrollView} from 'react-native';

import landingPage from './landingPage';
import detailPage from './detailPage';

export default function index({route}) {
  const {item} = route.params;

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
        showsVerticalScrollIndicator={false}>
        {landingPage(item)}
        {detailPage()}
      </ScrollView>
    </>
  );
}
