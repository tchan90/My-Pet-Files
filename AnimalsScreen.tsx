import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const AnimalsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.heading}>My Pets</Text>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={() => {}}
        >
          Add Pet
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 26,
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: '#4828ff',
    marginTop: Platform.OS === 'web' ? 12 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
export default AnimalsScreen;
