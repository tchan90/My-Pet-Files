import * as React from 'react';
import 'firebase/firestore';
import { format } from 'date-fns';

import { db } from '../configs/firebase';
import AppContext from '../AppContext';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

import CardInformation from '../components/CardInformation';

const ProfileScreen = ({ route, navigation }) => {
  const data = React.useContext(AppContext);
  const { owner } = data;

  const [visible, setVisible] = React.useState(false);
  const [petData, setPetData] = React.useState({});
  const [dietData, setDietData] = React.useState([]);
  const [drugData, setDrugData] = React.useState([]);
  const _goBack = () => navigation.goBack();
  const _handleMore = () => setVisible(!visible);
  const _closeMenu = () => setVisible(!visible);
  const { id, animal } = route.params;

  const getPetData = async () => {
    db.collection('animals')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const res = doc.data();
          const generalInfo = {
            Name: res.name,
            'Date of birth': format(new Date(res.dob), 'dd/MM/yyyy'),
            Owner: owner ? `${owner.firstName} ${owner.lastName}` : '',
          };
          setPetData(generalInfo);
        } else {
          console.log('No pet document exists');
        }
      })
      .catch((err) => {
        console.error('Error getting pet document', err);
      });
  };

  const getDietData = async () => {
    const dietArray: any = [];
    db.collection('diet')
      .where('animal', '==', `${id}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const res = doc.data();
          dietArray.push(res);
          setDietData(dietArray);
        });
      })
      .catch((error) => {
        console.log('Error getting diet documents: ', error);
      });
  };

  const getDrugData = async () => {
    const drugArray: any = [];
    db.collection('drugs')
      .where('animal', '==', `${id}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const res = doc.data();
          drugArray.push(res);
          setDrugData(drugArray);
        });
      })
      .catch((error) => {
        console.log('Error getting drug documents: ', error);
      });
  };

  React.useEffect(() => {
    getPetData();
    getDietData();
    getDrugData();
  }, []);

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

  const parasiteMeds = drugData.map((drug) => {
    if (drug.parasiteControl) {
      return drug;
    }
    return null;
  });

  const medication = drugData.map((med) => {
    if (med.medication) {
      return med;
    }
    return null;
  });

  const listViewData = [
    {
      title: 'Diet',
      icon: 'food-steak',
      data: dietData || [],
    },
    {
      title: 'Parasite Control',
      icon: 'spider',
      data: parasiteMeds,
    },
    {
      title: 'Medication',
      icon: 'pill',
      data: medication,
    },
  ];

  return (
    <>
      <StatusBar style="light" />
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={animal} />
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
            data={petData}
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
          {/* <CardInformation
            title="Notes"
            icon="note-text-outline"
            data={notes}
            type="dot"
          /> */}
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
