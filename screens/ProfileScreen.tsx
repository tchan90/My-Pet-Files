import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

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
    drugs: {
      parasiteControl: [
        {
          name: 'Advocate',
          dose: 'Once a month',
          action: 'Through skin',
        },
      ],
      medication: [
        {
          name: 'Antibiotics',
          dose: 'Three times a day for 14 days',
          action: 'Orally',
        },
      ],
    },
    notes: [
      'Needs training',
      'Will play and scratch bite',
      'History of cat flu at the shelter',
    ],
    image: '',
  };

  const { general, diet, drugs, notes, image } = dummyInfo;
  const listViewData = [
    {
      title: 'Diet',
      icon: 'food-steak',
      data: diet,
    },
    {
      title: 'Parasite Control',
      icon: 'spider',
      data: drugs.parasiteControl,
    },
    {
      title: 'Medication',
      icon: 'pill',
      data: drugs.medication,
    },
  ];

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
      <ScrollView>
        <View style={styles.container}>
          <CardInformation
            title="General Information"
            icon="cat"
            data={general}
            type="simple"
          />
          {listViewData.map((listData, key) => (
            <CardInformation
              key={key}
              title={listData.title}
              icon={listData.icon}
              data={listData.data}
              type="list"
            />
          ))}
          <CardInformation
            title="Notes"
            icon="note-text-outline"
            data={notes}
            type="dot"
          />
        </View>
      </ScrollView>
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
