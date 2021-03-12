import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../../constants';

export function index(props) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(() => {
    const {discovery} = props;
    setItems(discovery);
    setLoading(false);
  }, [props]);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h2, color: COLORS.gray, marginTop: 10}}>
            Loading..
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <MaterialIcons
          name="explore"
          size={SIZES.icon * 4}
          color={COLORS.gray}
        />
        <Text style={{...FONTS.h2, color: COLORS.gray, marginTop: 10}}>
          {items.data}
        </Text>
      </View>
    </View>
  );
}

const mapStateToProps = (store) => ({
  discovery: store.discoveryState.item,
});

export default connect(mapStateToProps, null)(index);
