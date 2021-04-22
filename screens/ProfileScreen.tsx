import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { Platform, Text, View } from 'react-native';
import { Button, Headline, Surface, Title } from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});
export default ProfileScreen;
