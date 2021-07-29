import React, { FC } from 'react';

import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { Text } from 'react-native-paper';

import capitilize from '../utils/capitlize';

interface FoodType {
  brand: string;
  duration: string;
  type: string;
}

interface MedicationType {
  name: string;
  dose: string;
  action: string;
}

interface InfoType {
  content: object;
  title: string;
}

const ListInformation: FC<InfoType> = ({ content, title }) => {
  if (title === 'Diet') {
    const { brand, duration, type }: FoodType = content;
    return (
      <View style={styles.container}>
        <Text style={styles.type}>{capitilize(type)}</Text>
        <Text style={styles.information}>Brand: {capitilize(brand)}</Text>
        <Text style={styles.information}>Duration: {capitilize(duration)}</Text>
      </View>
    );
  }

  const { name, dose, action }: MedicationType = content;
  return (
    <View style={styles.container}>
      <Text style={styles.type}>{capitilize(name)}</Text>
      <Text style={styles.information}>Dose: {capitilize(dose)}</Text>
      <Text style={styles.information}>How: {capitilize(action)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  information: {
    marginVertical: 4,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A3A0A0',
  },
  type: {
    marginTop: 6,
    marginBottom: 5,
    fontSize: 20,
  },
});
export default ListInformation;
