import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.heading}>My Pet Files</Text>
      <Image
        style={styles.homeImage}
        source={require('./assets/PetFilesImage.png')}
      />
      <TouchableOpacity
        onPress={() => {}}
        style={styles.button}
        accessibilityLabel="Register"
      >
        <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: '#4828ff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: Platform.OS === 'web' ? '12px' : '',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
