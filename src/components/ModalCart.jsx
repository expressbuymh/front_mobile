import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, Image, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Constants from 'expo-constants'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateCartItemMenos, updateCartItemMas } from '../../redux/actions/cartActions'
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/'

export const ModalCart = ({navigation, setCartExpanded }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.cart.cart)
  let cartDataId = data._id
  const cartData = useSelector(state => state.cart.items)
  const [headers, setHeaders] = useState()
  const [total, setTotal] = useState(0);

  let getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token')
      return token;
    } catch (error) {
      console.log('Error al obtener el token:', error)
      return null
    }
  }

  let getHeaders = async () => {
    try {
      let token = await getToken();
      let headers = { headers: { 'Authorization': `Bearer ${token}` } };
      return headers;
    } catch (error) {
      console.log('Error al obtener las headers:', error)
      return null
    }
  }

  useEffect(() => {
    console.log('entramos al carrito ');

    const fetchData = async () => {
      const headers = await getHeaders();
      setHeaders(headers)
    }
    fetchData()
  }, [])


  const closeMenu = () => {
    setCartExpanded(false)
  }

  const [items, setItems] = useState([]);

  const removeItemFromCart = (item) => {
    let dataDelete = {
      product_id: item
    }
    axios.post(apiUrl + `carts/deleteproduct/${cartDataId}`, dataDelete, headers)
      .then(res => {
        console.log('Producto Borrado')
        dispatch(removeFromCart(item))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    calculateTotal();
  }, [cartData]);

  const calculateTotal = () => {
    let total = 0
    cartData.forEach(item => {
      const price = item.product_id.price
      const quantity = item.quantity
      total += price * quantity
    });
    setTotal(total)
  }

  const decrementQuantity = (productId) => {
    const updatedItems = cartData.map((item) => {
      if (item.product_id._id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    const updatedItem = updatedItems.find((item) => item.product_id._id === productId);
    if (updatedItem) {
      let data = {
        product_id: updatedItem.product_id._id,
        quantity: updatedItem.quantity,
      };

      axios
        .post(apiUrl + `carts/addproducts/${cartDataId}`, data, headers)
        .then((res) => {
          console.log(res);
          dispatch(updateCartItemMenos(updatedItem));
        })
        .catch((err) => console.log(err));
    }
  };

  const incrementQuantity = (productId) => {
    const updatedItems = cartData.map((item) => {
      if (item.product_id._id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return item
    })

    const updatedItem = updatedItems.find((item) => item.product_id._id === productId)
    if (updatedItem) {
      let data = {
        product_id: updatedItem.product_id._id,
        quantity: updatedItem.quantity
      }
      axios.post(apiUrl + `carts/addproducts/${cartDataId}`, data, headers)
        .then(res => {
          console.log(res)
          dispatch(updateCartItemMas(updatedItem))
        })
        .catch(err => console.log(err))
    }
  }

  const emptyCart = () => {
    axios.put(apiUrl + `carts/clear/${cartDataId}`, headers)
      .then(res => console.log('Vaciado Correctamente'))
      .catch(err => console.log(err))
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.imgCart} source={{ uri: `${item.photo}` }} />
      <View style={styles.itemDetails}>
        <Text>{item.product_id.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.product_id.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(item.product_id._id)}>
          <Ionicons name="remove" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(item.product_id._id)}>
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItemFromCart(item.product_id._id)}>
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
          <TouchableOpacity style={styles.addButton} onPress={emptyCart}>
            <Text style={styles.addButtonText}>Empty cart</Text>
          </TouchableOpacity>
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={(item) => item.product_id._id.toString()}
            contentContainerStyle={styles.itemList}
          />
          <View style={styles.containerTotal}>
            <Text style={styles.totalText}>Total: ${total}</Text>
          </View>
          <Button
            title="Go to Pay"
            onPress={() => {
              setCartExpanded(false)
              navigation.navigate('AddressForm')
              console.log('Button pressed')
            }}
            color="#62c060"
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
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#f5f5f5',
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(250, 227, 226, 1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'rgba(255, 0, 0, 0.5)',
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
  imgCart: {
    width: '20%',
    height: '55%',
    resizeMode: 'cover',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    marginRight: 5,
    borderRadius: 10
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  itemDetails: {
    flex: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#62c060',
  },
  containerTotal: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
})