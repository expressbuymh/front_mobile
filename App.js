import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './src/page/Home'
import { SignUpForm } from './src/page/SignUpForm'
import { HomeProducts } from './src/page/HomeProducts'
import { NavBar } from './src/components/NavBar'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <NavBar {...props} />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ header: undefined }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpForm}
          options={{ header: undefined }}
        />
        <Stack.Screen
          name="HomeProducts"
          component={HomeProducts}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
