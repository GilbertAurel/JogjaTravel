import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {saveAttraction} from '../../redux/actions';
import {COLORS, FONTS, SIZES} from '../../constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export function detailPage({item, ...props}) {
  function header() {
    return (
      <View
        style={{
          height: SIZES.height * 0.25,
          width: SIZES.width,
          backgroundColor: COLORS.primary,
        }}></View>
    );
  }
  return <View style={styles.container}>{header()}</View>;
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({saveAttraction}, dispatch);

export default connect(null, mapDispatchToProps)(detailPage);

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
  },
});
