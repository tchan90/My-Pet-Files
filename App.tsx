import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import AnimalsScreen from './screens/AnimalsScreen';

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
  const hasOpened = true; // TODO: function to detect that user has app running in bg or not
  if (!hasOpened) {
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Animals" component={AnimalsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <Navigation />
      <StatusBar />
    </PaperProvider>
  );
};
export default App;
