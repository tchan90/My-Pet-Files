import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { Platform, Text, View } from 'react-native';
import { Button, Headline, Surface, Title } from 'react-native-paper';

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Headline style={styles.heading}>Personal Details</Headline>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={() => {}}
        >
          Edit Details
        </Button>
      </View>
      <View style={styles.detailsContainer}>
        <Surface style={styles.detailsSurface}>
          <Title style={styles.detailsTitle}>Owner</Title>
          <Text style={styles.detailsText}>Cruella De Ville</Text>
        </Surface>

        <Surface style={styles.detailsSurface}>
          <Title style={styles.detailsTitle}>Address</Title>
          <Text style={styles.detailsText}>De Vil Manor</Text>
          <Text style={styles.detailsText}>SpotVille</Text>
          <Text style={styles.detailsText}>4567, CA</Text>
        </Surface>

        <Surface style={styles.detailsSurface}>
          <Title style={styles.detailsTitle}>Phone Number</Title>
          <Text style={styles.detailsText}>666 666</Text>
        </Surface>

        <Surface style={styles.detailsSurface}>
          <Title style={styles.detailsTitle}>Vet Clinic</Title>
          <Text style={styles.detailsText}>Dalmation Clinic</Text>
          <Text style={styles.detailsText}>SpotVille</Text>
          <Text style={styles.detailsText}>4567, CA</Text>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
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
    fontSize: 11,
    textAlign: 'center',
  },
  detailsContainer: {
    marginVertical: 20,
  },
  detailsSurface: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
    borderRadius: 5,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#b5b5b5',
  },
  detailsText: {
    fontSize: 20,
  },
});
