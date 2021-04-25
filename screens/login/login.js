import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {COLORS, FONTS, IMAGE, SIZES} from '../../constants';

import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '1066880825211-i6s045a1eh7eh1kng46rhsoobe77l1r6.apps.googleusercontent.com',
});

export default function login() {
  const onGuestLogin = () => {
    auth()
      .signInAnonymously()
      .then(() =>
        ToastAndroid.show(
          'Guest login only save data temporarily',
          ToastAndroid.LONG,
        ),
      )
      .catch(() => console.log('error'));
  };

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Image
        source={IMAGE.HEADER_HOME}
        style={styles.background}
        resizeMode="cover"
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,1)']}
        style={styles.whiteOverlay}
      />
      <View style={styles.logoContainer}>
        <Image source={IMAGE.LOGO} resizeMode="contain" style={styles.logo} />
        {/* <Text style={styles.logoTitle}>Jogja Guide</Text> */}
      </View>
      <View>
        <GoogleSigninButton
          style={styles.buttonGoogle}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() =>
            onGoogleButtonPress()
              .then(() => console.log('Signed in with Google!'))
              .catch((error) => console.log(error))
          }
          disabled={false}
        />
        <TouchableOpacity
          style={styles.buttonGuest}
          onPress={() => onGuestLogin()}
          activeOpacity={0.6}>
          <Text style={styles.buttonGuestLabel}>Login as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZES.width,
    height: SIZES.height,
  },
  whiteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZES.width,
    height: SIZES.height,
  },
  logoContainer: {
    marginTop: SIZES.height * 0.2,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: SIZES.width * 0.5,
    marginBottom: 10,
  },
  logoTitle: {
    ...FONTS.h1,
    color: COLORS.primary,
  },
  buttonGoogle: {
    height: 50,
    width: SIZES.width * 0.5,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGoogleLabel: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  buttonGuest: {
    height: 50,
    width: SIZES.width * 0.5,
    marginBottom: SIZES.height * 0.1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGuestLabel: {
    ...FONTS.body2,
    color: COLORS.primary,
  },
});
