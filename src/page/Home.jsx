import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import { SignInForm } from '../components/SignInForm'
import { HomeProducts } from './HomeProducts'

export const Home = ({ navigation }) => {

  const handlePressSignUp = () => {
    navigation.navigate('SignUp')
    //navigation.navigate('HomeProducts')
    console.log('PIPO')
  }

  return (
    <>

      <ImageBackground
        style={styles.container}
        source={require('../../assets/forms.jpg')}
      >
        <View style={styles.contentContainer}>
          <SignInForm navigation={navigation} />
          <View style={styles.containSignUp}>
            <Text> You do not an account? </Text>
            <TouchableOpacity onPress={handlePressSignUp}>
              <Text style={styles.fullscreenButtonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.6)'
  },
  containSignUp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '65%'
  },
  fullscreenButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(13, 13, 125, 0.7)',
    textAlign: 'center',
  },
});

