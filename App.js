import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './src/page/Home'
import { SignUpForm } from './src/page/SignUpForm'
import { HomeProducts } from './src/page/HomeProducts'
import { ProductsCategory } from './src/page/ProductsCategory'
import AddressForm from './src/page/AddressForm'
import { OrderDetails } from './src/page/OrderDetails'
import { NavBar } from './src/components/NavBar'
import { Provider } from 'react-redux'
import UserProfile  from './src/page/UserProfile'
import ChangeAddressForm from './src/components/ChangeAddressForm'
import store from './redux/store'
import Toast from 'react-native-toast-message'

const Stack = createStackNavigator()

const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <NavBar {...props} navigation={props.navigation} />,
          }}
          initialRouteName='Home'
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
          <Stack.Screen
            name="ProductsCategory"
            component={ProductsCategory}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="AddressForm"
            component={AddressForm}
            options={{ header: undefined }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{ header: undefined }}
          />
          <Stack.Screen 
            name='Profile'
            component={UserProfile}
            options={{ header: undefined }}
          />
          <Stack.Screen 
            name='Edit address'
            component={ChangeAddressForm}
            options={{ header: undefined }}
          />
        </Stack.Navigator>
      </NavigationContainer>
     <Toast/>
    </Provider>
  );
};

export default App
