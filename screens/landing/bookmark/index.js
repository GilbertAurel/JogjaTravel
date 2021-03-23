import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

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

  function renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          color={COLORS.primary}
          size={SIZES.icon * 0.8}
          style={{
            position: 'absolute',
            elevation: 1,
            left: SIZES.paddingNormal * 3,
            bottom: 25,
          }}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="where are you going?"
        />
        <View
          style={{
            position: 'absolute',
            elevation: 1,
            right: SIZES.paddingNormal * 3,
            bottom: 25,
          }}>
          <MaterialIcons
            name="tune"
            color={COLORS.primary}
            size={SIZES.icon * 0.8}
          />
        </View>
      </View>
    );
  }

  function renderSavedAttractions() {
    return (
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
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: SIZES.width,
          height: SIZES.paddingWide,
          backgroundColor: COLORS.primary,
        }}
      />
      {renderSearch()}
      {attractions.length == 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
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
      ) : (
        renderSavedAttractions()
      )}
    </View>
  );
}

const mapStateToProps = (store) => ({
  savedAttraction: store.attractionState.savedAttraction,
});

export default connect(mapStateToProps, null)(index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
  },
  searchContainer: {
    height: SIZES.height * 0.1,
    width: SIZES.width,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchBar: {
    height: 30,
    width: SIZES.width * 0.9,
    marginBottom: 20,
    borderRadius: SIZES.radius,
    paddingVertical: 0,
    paddingHorizontal: SIZES.paddingNormal,
    backgroundColor: COLORS.white,
    ...FONTS.body2,
    textAlign: 'center',
  },
});
