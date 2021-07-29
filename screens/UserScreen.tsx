import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppContext from '../AppContext';

import { Platform, View } from 'react-native';
import {
  Button,
  Headline,
  Surface,
  Text,
  Title,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

export default function UserScreen() {
  const data = React.useContext(AppContext);
  const { owner, vet } = data;

  if (owner) {
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
            <Text style={styles.detailsText}>
              {owner.firstName} {owner.lastName}
            </Text>
          </Surface>

          <Surface style={styles.detailsSurface}>
            <Title style={styles.detailsTitle}>Address</Title>
            <Text style={styles.detailsText}>
              {owner.street}, {owner.suburb}
            </Text>
            <Text style={styles.detailsText}>{owner.countryCode}</Text>
          </Surface>

          <Surface style={styles.detailsSurface}>
            <Title style={styles.detailsTitle}>Phone Number</Title>
            <Text style={styles.detailsText}>{owner.phone}</Text>
          </Surface>

          <Surface style={styles.detailsSurface}>
            <Title style={styles.detailsTitle}>Vet Clinic</Title>
            <Text style={styles.detailsText}>{vet.name}</Text>
            <Text style={styles.detailsText}>
              {vet.street}, {vet.suburb}
            </Text>
            <Text style={styles.detailsText}>{vet.countryCode}</Text>
          </Surface>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ActivityIndicator animating={true} color={Colors.red800} />
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
