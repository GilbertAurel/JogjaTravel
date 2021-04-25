import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
  Linking,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, IMAGE, SIZES} from '../../../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../../../redux/actions';

export function index(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  useEffect(() => {
    setCurrentUser(auth().currentUser);
  }, []);

  function renderGoogleAccount() {
    const linkHandlerLI = () => {
      Linking.canOpenURL(
        'https://www.linkedin.com/in/gilbertus-aurel-satyawira/',
      )
        .then((supported) => {
          if (supported) {
            Linking.openURL(
              'https://www.linkedin.com/in/gilbertus-aurel-satyawira/',
            );
          } else {
            alert("Can't access url");
          }
        })
        .catch(() => {
          alert("Can't access url");
        });
    };

    const linkHandlerIG = () => {
      Linking.canOpenURL('https://www.instagram.com/gilbertaurel/')
        .then((supported) => {
          if (supported) {
            Linking.openURL('https://www.instagram.com/gilbertaurel/');
          } else {
            alert("Can't access url");
          }
        })
        .catch(() => {
          alert("Can't access url");
        });
    };

    const userLogout = () => {
      props.logout();
      auth().signOut();
    };

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={aboutModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAboutModal(!aboutModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Jogja Guide v.0.0.1 is an application to support Yogyakarta
                tourism industry. It was created as personal thesis project.
              </Text>
              <Text style={styles.modalText}>
                by. Gilbertus Aurel Satyawira
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setAboutModal(!aboutModal)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={reportModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAboutModal(!reportModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonLI]}
                onPress={() => linkHandlerLI()}>
                <Text style={styles.textStyle}>Contact me by LinkedIn</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonIG]}
                onPress={() => linkHandlerIG()}>
                <Text style={styles.textStyle}>Contact me by Instagram</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setReportModal(!reportModal)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.headerContainer}>
          <Image
            source={{uri: currentUser.photoURL}}
            resizeMode="contain"
            style={styles.headerPhoto}
          />
          <Text style={styles.headerName}>{currentUser.displayName}</Text>
          <Text style={styles.headerEmail}>{currentUser.email}</Text>
        </View>

        <TouchableOpacity
          style={styles.functionButton}
          onPress={() => setReportModal(true)}>
          <MaterialIcons
            name="report-problem"
            size={SIZES.icon}
            color={COLORS.primary}
          />
          <Text style={styles.buttonTag}>Report problem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.functionButton}
          onPress={() => setAboutModal(true)}>
          <MaterialIcons
            name="help-outline"
            size={SIZES.icon}
            color={COLORS.primary}
          />
          <Text style={styles.buttonTag}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.functionButton}
          onPress={() => userLogout()}>
          <MaterialIcons name="logout" size={SIZES.icon} color={COLORS.red} />
          <Text style={styles.buttonTag}>Sign out</Text>
        </TouchableOpacity>
        <View style={styles.navigationBackground} />
      </View>
    );
  }

  function renderAnonymousAccount() {
    const linkHandlerLI = () => {
      Linking.canOpenURL(
        'https://www.linkedin.com/in/gilbertus-aurel-satyawira/',
      )
        .then((supported) => {
          if (supported) {
            Linking.openURL(
              'https://www.linkedin.com/in/gilbertus-aurel-satyawira/',
            );
          } else {
            alert("Can't access url");
          }
        })
        .catch(() => {
          alert("Can't access url");
        });
    };

    const linkHandlerIG = () => {
      Linking.canOpenURL('https://www.instagram.com/gilbertaurel/')
        .then((supported) => {
          if (supported) {
            Linking.openURL('https://www.instagram.com/gilbertaurel/');
          } else {
            alert("Can't access url");
          }
        })
        .catch(() => {
          alert("Can't access url");
        });
    };

    const userLogout = () => {
      props.logout();
      auth().signOut();
    };

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={aboutModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAboutModal(!aboutModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Jogja Guide v.0.0.1 is an application to support Yogyakarta
                tourism industry. It was created as personal thesis project.
              </Text>
              <Text style={styles.modalText}>
                by. Gilbertus Aurel Satyawira
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setAboutModal(!aboutModal)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={reportModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAboutModal(!reportModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonLI]}
                onPress={() => linkHandlerLI()}>
                <Text style={styles.textStyle}>Contact me by LinkedIn</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonIG]}
                onPress={() => linkHandlerIG()}>
                <Text style={styles.textStyle}>Contact me by Instagram</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setReportModal(!reportModal)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.headerContainer}>
          <Image
            source={IMAGE.LOGO}
            resizeMode="contain"
            style={styles.headerPhoto}
          />
          <Text style={styles.headerName}>Guest Account</Text>
          <Text style={styles.headerEmail}>v.0.0.1</Text>
        </View>

        <TouchableOpacity
          style={styles.functionButton}
          onPress={() => setReportModal(true)}>
          <MaterialIcons
            name="report-problem"
            size={SIZES.icon}
            color={COLORS.primary}
          />
          <Text style={styles.buttonTag}>Report problem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.functionButton}
          onPress={() => setAboutModal(true)}>
          <MaterialIcons
            name="help-outline"
            size={SIZES.icon}
            color={COLORS.primary}
          />
          <Text style={styles.buttonTag}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.functionButton}
          onPress={() => userLogout()}>
          <MaterialIcons name="logout" size={SIZES.icon} color={COLORS.red} />
          <Text style={styles.buttonTag}>Back to login</Text>
        </TouchableOpacity>
        <View style={styles.navigationBackground} />
      </View>
    );
  }

  if (currentUser) {
    if (currentUser.displayName) {
      return renderGoogleAccount();
    } else {
      return renderAnonymousAccount();
    }
  } else {
    return <View style={styles.container}></View>;
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({logout}, dispatch);

export default connect(null, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
    alignItems: 'center',
  },
  headerContainer: {
    width: SIZES.width,
    height: 350,
    paddingTop: 100,
    marginBottom: 20,
    alignItems: 'center',
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
  headerPhoto: {
    height: 120,
    width: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  headerName: {
    ...FONTS.h2,
  },
  headerEmail: {
    ...FONTS.body3,
  },
  functionButton: {
    width: SIZES.width * 0.85,
    height: 50,
    marginBottom: 20,
    paddingStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
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
  buttonTag: {
    marginLeft: 20,
    ...FONTS.body1,
  },
  navigationBackground: {
    position: 'absolute',
    height: 60,
    width: SIZES.width,
    bottom: 0,
    elevation: 1,
    backgroundColor: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    width: 100,
    marginTop: 10,
    backgroundColor: COLORS.primary,
  },
  buttonLI: {
    width: 250,
    marginTop: 10,
    backgroundColor: COLORS.linkedin,
  },
  buttonIG: {
    width: 250,
    marginTop: 10,
    backgroundColor: COLORS.instagram,
  },
  textStyle: {
    ...FONTS.body2,
    color: COLORS.white,
    textAlign: 'center',
  },
  modalText: {
    ...FONTS.body2,
    marginBottom: 10,
    textAlign: 'center',
  },
});
