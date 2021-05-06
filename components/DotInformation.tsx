import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { Text } from 'react-native-paper';

import capitilize from '../utils/capitlize';

const DotInformation = ({ content }: { content: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}> - {capitilize(content)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  content: {
    marginTop: 2,
    marginLeft: 8,
    fontSize: 18,
  },
});
export default DotInformation;
