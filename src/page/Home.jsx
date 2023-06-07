import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { SignInForm } from '../components/SignInForm'

export const Home = ({ navigation }) => {

  const handlePressSignUp = () => {
    navigation.navigate('SignUp')
    console.log('PIPO')
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Home</Text>
        <SignInForm />
        <TouchableOpacity style={styles.fullscreenButton} onPress={handlePressSignUp}>
          <Text style={styles.fullscreenButtonText} >SignUp</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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
});

