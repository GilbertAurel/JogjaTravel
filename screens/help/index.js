import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  ToastAndroid,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../../constants';
import emergency from '../../constants/dummyData/emergency';

export default function index({navigation}) {
  function contactList() {
    const renderItem = ({item}) => {
      const linkHandler = () => {
        Linking.canOpenURL(item.website)
          .then((supported) => {
            if (supported) {
              Linking.openURL(item.website);
            } else {
              ToastAndroid.show('Could not access url!', ToastAndroid.SHORT);
            }
          })
          .catch(() => {
            ToastAndroid.show('Could not access url!', ToastAndroid.SHORT);
          });
      };

      const phoneHandler = () => {
        const phoneNumber = `tel:${item.number}`;
        Linking.canOpenURL(phoneNumber)
          .then((supported) => {
            if (supported) {
              Linking.openURL(phoneNumber);
            } else {
              ToastAndroid.show('Could not access url!', ToastAndroid.SHORT);
            }
          })
          .catch(() => {
            ToastAndroid.show('Could not access url!', ToastAndroid.SHORT);
          });
      };

      return (
        <View style={styles.contactContainer}>
          <Image
            source={item.icon}
            resizeMode="cover"
            style={styles.contactIcon}
          />
          <View style={styles.contactText}>
            <Text style={styles.contactTitle}>{item.name}</Text>
            <Text style={styles.contactRole}>{item.role}</Text>
          </View>
          <View style={styles.contactFunctions}>
            <TouchableOpacity onPress={() => linkHandler()}>
              <MaterialIcons
                name="language"
                size={SIZES.icon}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => phoneHandler()}>
              <MaterialIcons
                name="phone"
                size={SIZES.icon}
                color={COLORS.green}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={emergency}
        keyExtractor={(item) => `${item.name}`}
        renderItem={renderItem}
        style={styles.bodyContainer}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={SIZES.icon}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contact</Text>
        <View style={styles.backButton} />
      </View>
      {contactList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
  },
  headerContainer: {
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
  backButton: {
    height: SIZES.icon * 1.5,
    width: SIZES.icon * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...FONTS.h2,
  },
  bodyContainer: {
    flex: 1,
    paddingTop: 20,
  },
  contactContainer: {
    height: 80,
    width: SIZES.width * 0.9,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2.0,
    elevation: 1,
  },
  contactIcon: {
    height: SIZES.icon * 1.5,
    width: SIZES.icon * 1.5,
    borderRadius: SIZES.icon,
  },
  contactText: {
    flex: 1,
    marginHorizontal: 20,
  },
  contactFunctions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
  },
  contactTitle: {
    ...FONTS.body1,
  },
  contactRole: {
    ...FONTS.body3,
  },
});
