// Import different screen pages

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNav';
import LinkingConfiguration from './LinkingConfig';
import ProfileScreen from '../screens/ProfileScreen';
import AddAnimalScreen from '../screens/forms/add/AddAnimalScreen';

const Navigation = () => {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
};
export default Navigation;

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Main = createStackNavigator();

const RootNavigator = () => {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name="Root" component={BottomTabNavigator} />
      <Main.Screen name="Profile" component={ProfileScreen} />
      <Main.Screen name="AddAnimalScreen" component={AddAnimalScreen} />
      {/* <Main.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Main.Navigator>
  );
};
