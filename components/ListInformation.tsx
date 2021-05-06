import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { Text } from 'react-native-paper';

import capitilize from '../utils/capitlize';

interface ListType {
  brand: string;
  duration: string;
  type: string;
}

const ListInformation = ({ content }) => {
  const { brand, duration, type }: ListType = content;
  return (
    <View style={styles.container}>
      <Text style={styles.type}>{capitilize(type)}</Text>
      <Text style={styles.information}>Brand: {capitilize(brand)}</Text>
      <Text style={styles.information}>Duration: {capitilize(duration)}</Text>
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
