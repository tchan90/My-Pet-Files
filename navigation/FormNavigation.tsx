import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const FormStack = createStackNavigator();

const FormNavigation = () => {
  return (
    <FormStack.Navigator>
      <FormStack.Screen name="AnimalType" component={AnimalType} />
    </FormStack.Navigator>
  );
};

export default FormNavigation;
