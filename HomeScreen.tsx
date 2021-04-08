import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function GreetScreen() {
  const registered = false;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.heading}>My Pet Files</Text>
      <Image
        style={styles.homeImage}
        source={require('./assets/PetFilesImage.png')}
      />
      <TouchableOpacity
        onPress={() => {
          console.log('abd');
        }}
        style={styles.button}
        accessibilityLabel={registered ? 'Register' : 'Enter'}
      >
        <Text style={styles.buttonText}>
          {registered ? 'Register' : 'Enter'}
        </Text>
      </TouchableOpacity>
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
    backgroundColor: '#4828ff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: Platform.OS === 'web' ? 12 : 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
