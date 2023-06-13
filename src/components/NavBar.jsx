import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { ModalCart } from './ModalCart'
import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const NavBar = ({ navigation }) => {
  const [isMenuExpanded, setMenuExpanded] = useState(false)
  const [isUserExpanded, setUserExpanded] = useState(false)
  const [isCartExpanded, setCartExpanded] = useState(false)
  const [categories, setCategories] = useState()

  const toggleMenu = () => {
    setMenuExpanded(!isMenuExpanded);
  }

  const toggleUser = () => {
    setUserExpanded(!isUserExpanded)
  }

  const toggleCart = () => {
    setCartExpanded(!isCartExpanded)
  }

  const closeMenu = () => {
    setMenuExpanded(false)
    setUserExpanded(false)
    setCartExpanded(false)
  }

  let getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error al obtener el token:', error);
      return null;
    }
  }

  let getHeaders = async () => {
    try {
      let token = await getToken();
      let headers = { headers: { 'Authorization': `Bearer ${token}` } };
      return headers;
    } catch (error) {
      console.log('Error al obtener las headers:', error);
      return null;
    }
  }

  const signOut = async () => {
    let headers = await getHeaders()
    console.log('cargando...')
    axios.post(apiUrl + "auth/signout", null, headers)
      .then(res => {
        AsyncStorage.removeItem("token")
          .then(() => console.log('token eliminado'))
          .catch(err => console.log(err))
        AsyncStorage.removeItem("user")
          .then(() => console.log('user eliminado'))
          .catch(err => console.log(err))
        //localStorage.removeItem("user")
      })
      .catch(err => alert(err))
  }

  useEffect(
    () => {
      axios.get(apiUrl + 'categories?department_id=&name=')
        .then(res => {
          //console.log(JSON.stringify(res, null, 2))
          setCategories(res.data.categories)
        })
        .catch(err => console.log(err))
    }, []
  )

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleMenuItemPress(item._id)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <View style={styles.itemSeparator} />
    </TouchableOpacity>
  )

  const handleMenuItemPress = (category_id) => {
    navigation.navigate('ProductsCategory', { category_id })
    console.log('Se hizo clic en el elemento:', category_id);
  }

  const returnHome = () => {
    setMenuExpanded(false)
    navigation.navigate('HomeProducts')
  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.menuLogo}>
          <TouchableOpacity onPress={toggleMenu} style={styles.button}>
            <Ionicons name='menu' size={24} color="white" />
          </TouchableOpacity>
          <Image style={styles.logo} source={require('../../assets/favicon.png')} />
        </View>
        <View style={styles.menuLogo}>
          <TouchableOpacity onPress={toggleUser} style={styles.button2}>
            <Ionicons name='person-circle-outline' size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCart} style={styles.button2}>
            <MaterialIcons name='shopping-cart' size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemSeparator} />

      <Modal visible={isMenuExpanded} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.menu}>
            <TouchableOpacity onPress={returnHome} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <FlatList
              data={categories}
              renderItem={renderItem}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={isUserExpanded} animationType="slide" transparent={true}>
        <View style={styles.overlayUser}>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButtonUser}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.menuUser}>
            <TouchableOpacity style={styles.item} onPress={signOut}>
              <Text style={styles.itemText}>Profile</Text>
              <View style={styles.itemSeparator} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.itemText}>Sign Out</Text>
              <View style={styles.itemSeparator} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isCartExpanded} animationType="slide" transparent={true}>
        <ModalCart setCartExpanded={setCartExpanded} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 1,
  },
  container1: {
    flex: 1,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingTop: 25,
  },
  button: {
    backgroundColor: 'rgba(13, 13, 125, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  button2: {
    padding: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayUser: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 120
  },
  menu: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  menuUser: {
    flexDirection: 'column',
    width: '50%',
    //height: 150,
    backgroundColor: 'white',
    padding: 10,
    flex:1
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeButtonUser: {
    padding: 10,
    backgroundColor: 'white',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 18,
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  menuLogo: {
    flexDirection: 'row',
    width: 110,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 4
  },
  buttonContainer: {
    backgroundColor: '#4F46E5',
    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
    width: 270
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})
