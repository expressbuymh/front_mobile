import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const SignInForm = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sendForm = () => {
    const emailValue = email;
    const passwordValue = password;


    let data = {
      email: emailValue,
      password: passwordValue
    };
    console.log('Cargando...')
    console.log(apiUrl + 'auth/signin')
    //navigation.navigate('HomeProducts')
    axios.post(apiUrl + 'auth/signin', data)
      .then((res) => {
        console.log('Entramos');
        navigation.navigate('HomeProducts')
        //console.log(JSON.stringify(res, null, 2));
        AsyncStorage.setItem("token", res.data.token)
          .then(() => console.log('Guardado en el storage'))
          .catch(err => console.log(err))
        AsyncStorage.setItem("user", JSON.stringify(res.data.user))
          .then(() => console.log('Datos De usuario guardado'))
          .catch(err => console.log(err))
        AsyncStorage.setItem("cart", JSON.stringify(res.data.cart))
          .then(() => console.log('Datos Del carrito guardado'))
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err);
        console.log('No entramos');
      });
  };

  return (

    <View style={styles.container}>
      <View style={styles.containLogo}>
        <Image source={require('../../assets/favicon.png')} />
      </View>
      <Text style={styles.textLabel}> Email address</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="black" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="lightgray"
        />
      </View>
      <Text style={styles.textLabel}> Password</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="lightgray"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={sendForm}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  containLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff1e',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: 270,
    height: 40,
  },
  icon: {
    marginLeft: 4,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'System',
    color: 'rgba(13, 13, 125, 0.7)',
  },
  buttonContainer: {
    backgroundColor: '#4F46E5',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textLabel: {
    color: 'black'
  }
});
