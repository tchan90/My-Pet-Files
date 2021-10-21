import * as React from 'react';
import AppContext from '../AppContext';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, List } from 'react-native-paper';

const AnimalsScreen = ({ navigation }) => {
  const data = React.useContext(AppContext);
  const { pets } = data;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.heading}>My Pets</Text>
        <Button
          mode="contained"
          icon="plus"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={() => navigation.navigate('AddAnimalScreen')}
        >
          Add Pet
        </Button>
      </View>
      <List.Section>
        {pets.map((pet) => (
          <List.Item
            key={pet.id}
            title={pet.name}
            titleStyle={styles.listItem}
            left={() => (
              <Avatar.Image size={45} source={{ uri: `${pet.image}` }} />
            )}
            right={() => (
              <Button
                mode="outlined"
                style={styles.buttonList}
                contentStyle={styles.buttonListContentStyle}
                labelStyle={styles.buttonListText}
                onPress={() =>
                  navigation.navigate('Profile', {
                    id: pet.id,
                    animal: pet.name,
                  })
                }
              >
                View
              </Button>
            )}
          />
        ))}
      </List.Section>
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
  header: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 20,
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
  buttonList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonListContentStyle: {
    width: 80,
    height: 40,
  },
  buttonListText: {
    color: '#4828ff',
    fontSize: 11,
    textAlign: 'center',
  },
  listItem: {
    fontSize: 20,
  },
});
export default AnimalsScreen;
