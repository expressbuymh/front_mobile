import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { SignInForm } from '../components/SignInForm'
import { NavBar } from '../components/NavBar'

export const Home = ({ navigation }) => {

  const handlePressSignUp = () => {
    navigation.navigate('SignUp')
    //navigation.navigate('HomeProducts')
    console.log('PIPO')
  }

  return (
    <>
      
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text>Home</Text>
          <SignInForm navigation={navigation} />
          <TouchableOpacity style={styles.fullscreenButton} onPress={handlePressSignUp}>
            <Text style={styles.fullscreenButtonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100, // Ajusta el valor según sea necesario
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

