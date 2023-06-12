import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Constants from 'expo-constants'
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const ModalCart = ({ setCartExpanded }) => {

  const [cartData, setCartData] = useState()

  let getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error al obtener el token:', error);
      return null;
    }
  }

  const fetchCartData = async () => {
    try {
      const cartString = await AsyncStorage.getItem('cart');
      if (cartString) {
        const cart = JSON.parse(cartString);
        return cart
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    console.log('entramos al carrito ');

    const fetchData = async () => {
      const cartData = await fetchCartData();
      const headers = await getHeaders();
      console.log('cart Data', cartData?.products[0].product_id.name);
      setCartData(cartData?.products)
    }
    fetchData();
  }, []);


  const closeMenu = () => {
    setCartExpanded(false)
  }

  const [items, setItems] = useState([]);

  const addItemToCart = (item) => {
    setItems([...items, item])
    setCartData([...cartData, item])

  };

  const removeItemFromCart = (item) => {
    const updatedItems = cartData.filter((cartItem) => cartItem.id !== item.id);
    setItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.product_id.name}</Text>
      <TouchableOpacity onPress={() => removeItemFromCart(item)}>
        <Ionicons name="trash" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>

      <View style={styles.overlay}>
        <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>Carrito de compra</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => addItemToCart({ id: Date.now(), name: 'Producto' })}>
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.addButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={(item) => item.product_id._id.toString()}
            contentContainerStyle={styles.itemList}
          />
        </View>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  containerCart: {
    flex: 1,
    backgroundColor: 'white'
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  itemList: {
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
})