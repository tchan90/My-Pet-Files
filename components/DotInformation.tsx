import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import capitilize from '../utils/capitlize';

const DotInformation = ({ content }: { content: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {' '}
        <Avatar.Icon size={19} icon={'tag'} /> {capitilize(content)}
      </Text>
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
