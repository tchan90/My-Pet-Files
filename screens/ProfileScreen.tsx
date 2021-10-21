// Individial animal view
import * as React from 'react';
import 'firebase/firestore';
import { format } from 'date-fns';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
import { Appbar, Menu, Text } from 'react-native-paper';

import { db } from '../configs/firebase';
import AppContext from '../AppContext';
import CardInformation from '../components/CardInformation';

const ProfileScreen = ({ route, navigation }) => {
  const data = React.useContext(AppContext);
  const { owner } = data;

  const [visible, setVisible] = React.useState(false);
  const [petData, setPetData] = React.useState({});
  const [dietData, setDietData] = React.useState([]);
  const [drugData, setDrugData] = React.useState([]);
  const [notesData, setNotesData] = React.useState({});
  const [image, setImage] = React.useState('');

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
          setImage(res.image);
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

  const getNotesData = async () => {
    db.collection('notes')
      .where('animal', '==', `${id}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const res = doc.data();
          setNotesData(res);
        });
      })
      .catch((err) => {
        console.error('Error getting pet document', err);
      });
  };

  React.useEffect(() => {
    getPetData();
    getDietData();
    getDrugData();
    getNotesData();
  }, []);

  const parasiteMeds = [];
  const medication = [];
  drugData.map((drug) => {
    if (drug.parasiteControl) {
      parasiteMeds.push(drug);
    }
    medication.push(drug);
  });

  const notes = notesData.note || [];

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
  const dataPresent = dietData || parasiteMeds || medication || notes;
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
          {dataPresent ? (
            <>
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
              <CardInformation
                title="Notes"
                icon="note-text-outline"
                data={notes}
                type="dot"
              />
              <Image
                source={{ uri: `${image}` }}
                style={{ width: '100%', height: 400, borderRadius: 5 }}
              />
            </>
          ) : (
            <Text>No data present!</Text>
          )}
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
