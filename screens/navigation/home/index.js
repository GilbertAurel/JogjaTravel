import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {SIZES, COLORS} from '../../../constants';

import HomeHeader from './header';
import HomeBody from './body';
import {connect} from 'react-redux';

export function home(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [props]);

  if (loaded) {
    return (
      <View style={styles.container}>
        <View style={styles.navigationBackground} />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <HomeHeader {...props} />
          <HomeBody {...props} />
        </ScrollView>
      </View>
    );
  } else {
    return <View></View>;
  }
}

const mapStateToProps = (store) => ({
  popularAttractions: store.discoveryState.popularAttractions,
  attractions: store.discoveryState.item,
  news: store.newsState.news,
});

export default connect(mapStateToProps, null)(home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  navigationBackground: {
    position: 'absolute',
    height: 60,
    width: SIZES.width,
    bottom: 0,
    elevation: 1,
    backgroundColor: COLORS.white,
  },
});
