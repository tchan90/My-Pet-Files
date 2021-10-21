import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import capitilize from '../utils/capitlize';

const SimpleInformation = ({
  content,
  title,
}: {
  content: string;
  title: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitilize(title)}</Text>
      <Text style={styles.content}>{capitilize(content)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A3A0A0',
  },
  content: {
    marginTop: 6,
    fontSize: 20,
  },
});
export default SimpleInformation;
