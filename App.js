import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './src/pages/Home'
import { SignUpForm } from './src/pages/SignUpForm.jsx'

const Stack = createStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};