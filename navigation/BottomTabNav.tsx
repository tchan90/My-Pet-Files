import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import UserScreen from '../screens/UserScreen';
import AnimalsScreen from '../screens/AnimalsScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Animals"
      tabBarOptions={{ activeTintColor: 'purple' }}
    >
      <BottomTab.Screen
        name="User"
        component={TabUserNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Pets"
        component={TabAnimalsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabUserNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabUserScreen"
        component={UserScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabAnimalsNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabAnimalScreen"
        component={AnimalsScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}
