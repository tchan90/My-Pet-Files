import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

import CardInformation from '../components/CardInformation';

const ProfileScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const _goBack = () => navigation.goBack();
  const _handleMore = () => setVisible(!visible);
  const _closeMenu = () => setVisible(!visible);

  const dummyInfo = {
    general: {
      species: 'cat',
      dob: '02/08/2019',
      age: '1 year 6 months',
      address: '111 Cat Road, Whiskers Hills',
    },
    diet: [
      {
        type: 'Patte wet food',
        duration: 'Once a day',
        brand: 'Dine',
      },
      {
        type: 'Indoor dry food',
        duration: 'Twice a day',
        brand: 'Royal Canin',
      },
    ],
  };

  return (
    <>
      <StatusBar style="light" />
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Muttons" />
        <Menu
          visible={visible}
          onDismiss={_closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={_handleMore}
            />
          }
        >
          <Menu.Item onPress={() => {}} title="Edit File" icon="pencil" />
          <Menu.Item onPress={() => {}} title="Generate PDF" icon="file-pdf" />
          <Menu.Item onPress={() => {}} title="Delete" icon="trash-can" />
        </Menu>
      </Appbar.Header>
      <View style={styles.container}>
        <CardInformation
          title="General Information"
          icon="cat"
          data={dummyInfo.general}
          type="simple"
        />
        <CardInformation
          title="Diet"
          icon="food-steak"
          data={dummyInfo.diet}
          type="list"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#EEEEEE',
  },
});
export default ProfileScreen;
