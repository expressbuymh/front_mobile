import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native'
import Constants from 'expo-constants';
import axios from 'axios';
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const SignUpForm = ({ navigation }) => {

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState('')

  const handlePressSignUp = () => {
    //navigation.navigate('SignUp')
    console.log('PIPO2')
  }

  const handleSignUp = () => {
    console.log('Nombre:', name);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    console.log('Foto:', photo);

    let dataUserRegister = {
      email: email,
      name: name,
      last_name: lastName,
      password: password,
      photo: photo,
    };

    console.log('Cargando...')
    axios
      .post(apiUrl + "auth/signup", dataUserRegister)
      .then((res) => {
        console.log('Registro exitoso')
        navigation.navigate('Home')
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <>
      {/* <Text>SignUpForm</Text>
      <TouchableOpacity style={styles.fullscreenButton} onPress={handlePressSignUp}>
        <Text style={styles.fullscreenButtonText} >Sign</Text>
      </TouchableOpacity> */}

      <View style={styles.container}>
        <ImageBackground
          /* source={require('../../assets/image/form.webp')} */
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Photo"
              value={photo}
              onChangeText={setPhoto}
            />
            <View style={styles.backB}>
              <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullscreenButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    width: '70%',
  },
  fullscreenButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.5,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 10,
    width: 270, 
    height: 0, 
    flex: 1,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
  },
  backB: {
    backgroundColor: 'rgba(0, 170, 50, 0.7)',
    textAlign: 'center',
    height: 50,
    borderRadius: 10,
  }
});