import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';

export default function App() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.heading}>My Pet Files</Text>
      <Image
        style={styles.homeImage}
        source={require('./assets/PetFilesImage.png')}
      />
      <Button
        onPress={() => {}}
        title="Register"
        color="#6223c7"
        accessibilityLabel="Register"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  homeImage: {
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
  },
  buttonStyle: {},
});
