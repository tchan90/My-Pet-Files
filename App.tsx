import * as React from 'react';
import 'firebase/firestore';
import { db } from './configs/firebase';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import AnimalsScreen from './screens/AnimalsScreen';
import AppProvider from './AppProvider';

import Navigation from './navigation';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4828ff',
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [ownerData, setOwnerData] = React.useState({});
  const [petsData, setPetsData] = React.useState([]);
  const [vetData, setVetData] = React.useState({});

  const getVetData = async (clinic: String) => {
    await db
      .collection('vetClinics')
      // Pass ID of clinic from owner data
      .doc(`${clinic}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const res = doc.data();
          setVetData(res);
        } else {
          console.log('No vet document exists');
        }
      })
      .catch((err) => {
        console.error('Error getting vet clinic', err);
      });
  };

  const getPetData = (ownerID: any) => {
    const petsArray: any = [];
    db.collection('animals')
      .where('owner', '==', `${ownerID}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const res = doc.data();
          const id = doc.id;
          const petObj = { ...res, id };
          petsArray.push(petObj);
        });
        setPetsData(petsArray);
      })
      .catch((error) => {
        console.log('Error getting pet documents: ', error);
      });
  };

  const getData = async () => {
    const ownerID = '3AhUraGBvRHEKQyGp9GB';
    // Fetch owner data first
    await db
      .collection('owners')
      .doc(ownerID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const res = doc.data();
          if (res) {
            const clinic = res.vetClinic;
            // Fetch clinic and pet data
            getVetData(clinic);
            getPetData(ownerID);
          }
          setOwnerData(res);
        } else {
          console.log('No owner document exists');
        }
      })
      .catch((err) => {
        console.error('Error getting owner document', err);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const hasOpened = true; // TODO: function to detect that user has app running in bg or not
  if (hasOpened) {
    return (
      <AppProvider petsData={petsData} ownerData={ownerData} vetData={vetData}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Animals" component={AnimalsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AppProvider>
    );
  }
  return (
    <AppProvider petsData={petsData} ownerData={ownerData} vetData={vetData}>
      <PaperProvider theme={theme}>
        <Navigation />
        <StatusBar />
      </PaperProvider>
    </AppProvider>
  );
};
export default App;
