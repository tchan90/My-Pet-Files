import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const registered = false;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.heading}>My Pet Files</Text>
      <Image
        style={styles.homeImage}
        source={require('./assets/PetFilesImage.png')}
      />
      <Button
        mode="contained"
        icon="call-made"
        style={styles.button}
        labelStyle={styles.buttonText}
        contentStyle={styles.buttonBody}
        onPress={() => navigation.navigate('Animals')}
      >
        {registered ? 'Register' : 'Enter'}
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
    marginTop: Platform.OS === 'web' ? 12 : 0,
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
