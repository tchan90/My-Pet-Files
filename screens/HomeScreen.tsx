// Login View
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Login from './forms/authorization/Login';
import Register from './forms/authorization/Register';

const HomeScreen = ({ navigation }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };
  const closeRegisterModal = () => {
    setRegisterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.heading}>My Pet Files</Text>
      <Login modalVisible={loginModalVisible} closeModal={closeLoginModal} />
      <Register
        modalVisible={registerModalVisible}
        closeModal={closeRegisterModal}
      />

      <Image
        style={styles.homeImage}
        source={require('../assets/PetFilesImage.png')}
      />
      <Button
        mode="contained"
        icon="call-made"
        style={styles.button}
        labelStyle={styles.buttonText}
        contentStyle={styles.buttonBody}
        onPress={() => setLoginModalVisible(true)}
      >
        Login
      </Button>
      <Button
        mode="contained"
        icon="account-circle"
        style={styles.button}
        labelStyle={styles.buttonText}
        contentStyle={styles.buttonBody}
        // onPress={() => navigation.navigate('Animals')}
        onPress={() => setRegisterModalVisible(true)}
      >
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'serif',
  },

  homeImage: {
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
  },
  button: {
    width: 250,
    marginTop: 12,
  },
  buttonBody: {
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default HomeScreen;
