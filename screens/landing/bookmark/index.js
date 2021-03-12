import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {attraction} from '../../../redux/reducers/attraction';

export function index(props) {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const {savedAttraction} = props;
    setAttractions(savedAttraction);
  }, [props.savedAttraction]);

  if (attractions.length == 0)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="bookmark"
            size={SIZES.icon * 4}
            color={COLORS.gray}
          />
          <Text style={{...FONTS.h2, color: COLORS.gray, marginTop: 10}}>
            No data
          </Text>
        </View>
      </View>
    );
  else
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {attractions.map((a) => (
            <View>
              <TouchableOpacity
                key={a.id}
                style={{...FONTS.h2, color: COLORS.gray, marginTop: 10}}>
                <Text>{a.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
}

const mapStateToProps = (store) => ({
  savedAttraction: store.attractionState.savedAttraction,
});

export default connect(mapStateToProps, null)(index);
