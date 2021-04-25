import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {COLORS, FONTS, SERVER, SIZES} from '../../../constants';
import {FlatList} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {fetchSavedAttraction, deleteAttraction} from '../../../redux/actions';

export function index(props) {
  const {savedAttraction, navigation} = props;
  const [attractions, setAttractions] = useState(null);

  useEffect(() => {
    setAttractions(savedAttraction);
  }, [props]);

  function renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="search saved attraction"
          onChangeText={(text) => {
            setSearchAttractions(() => {
              return attractions.filter((doc) =>
                doc.title.toLowerCase().includes(text.toLowerCase()),
              );
            });
          }}
        />
      </View>
    );
  }

  function renderNoData() {
    return (
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
    );
  }

  function renderSavedAttractions() {
    const renderItem = ({item}) => {
      const deleteAttraction = () => {
        if (auth().currentUser.email != null) {
          firestore()
            .collection('attraction')
            .doc(auth().currentUser.uid)
            .collection('saved')
            .get()
            .then((snapshot) => {
              snapshot.docs.map((doc) => {
                const data = doc.data();
                const id = doc.id;

                if (data.title == item.title) {
                  firestore()
                    .collection('attraction')
                    .doc(auth().currentUser.uid)
                    .collection('saved')
                    .doc(id)
                    .delete()
                    .then(() => {
                      props.deleteAttraction(item);
                    });
                }
              });
            });
        } else {
          props.deleteAttraction(item);
        }
      };

      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate('attraction', {
              item: item,
            })
          }>
          <Image
            source={{uri: `${SERVER}/${item.imageURL}`}}
            resizeMode="cover"
            style={styles.itemImage}
          />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemLocation}>{item.address}</Text>
            <View style={styles.itemRatingContainer}>
              <MaterialIcons
                name="star"
                size={SIZES.icon * 0.8}
                color={COLORS.yellow}
              />
              <Text style={styles.itemRating}>{item.rating}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => deleteAttraction()}>
            <MaterialIcons
              name="clear"
              size={SIZES.icon}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={attractions}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        style={styles.listContainer}
        ListFooterComponent={() => {
          return <View style={{height: 20}} />;
        }}
      />
    );
  }

  if (!attractions) return <View></View>;
  else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            width: SIZES.width,
            height: SIZES.paddingWide,
            backgroundColor: COLORS.white,
          }}
        />
        {renderSearch()}
        {attractions.length == 0 ? renderNoData() : renderSavedAttractions()}
        <View style={styles.navigationBackground} />
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  savedAttraction: store.attractionState.savedAttraction,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchSavedAttraction, deleteAttraction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
  },
  searchContainer: {
    height: 100,
    width: SIZES.width,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: SIZES.paddingWide,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.01,
    shadowRadius: 2.0,
    elevation: 1,
  },
  searchBar: {
    flex: 1,
    height: 30,
    borderRadius: SIZES.radius,
    paddingVertical: 0,
    paddingHorizontal: SIZES.paddingNormal,
    backgroundColor: COLORS.lightgray,
    ...FONTS.body2,
    textAlign: 'center',
  },
  listContainer: {
    width: SIZES.width,
  },
  itemContainer: {
    width: SIZES.width * 0.9,
    height: 120,
    marginTop: SIZES.paddingWide,
    paddingHorizontal: SIZES.paddingWide,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2.0,
    elevation: 2,
  },
  itemImage: {
    height: '80%',
    width: 100,
    marginRight: SIZES.paddingNormal,
    borderRadius: 10,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemTitle: {
    ...FONTS.h2,
  },
  itemLocation: {
    ...FONTS.body1,
  },
  itemRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRating: {
    ...FONTS.body2,
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
