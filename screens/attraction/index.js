import React, {useEffect, useRef} from 'react';
import {StatusBar, ScrollView, TouchableOpacity, Text} from 'react-native';

import LandingPage from './landingPage';
import DetailPage from './detailPage';
import {connect} from 'react-redux';

export function index({route, navigation, ...props}) {
  const {savedAttraction} = props;
  const {item} = route.params;
  const scrollRef = useRef();

  if (!savedAttraction) {
    return <></>;
  } else {
    const loved = () => {
      let state = false;

      savedAttraction.map((doc) => {
        if (doc.title == item.title) {
          state = true;
        }
      });

      return state;
    };

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
          <LandingPage
            item={item}
            scrollRef={scrollRef}
            navigation={navigation}
            loved={loved()}
          />
          <DetailPage item={item} />
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  savedAttraction: store.attractionState.savedAttraction,
});

export default connect(mapStateToProps, null)(index);
