import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native'
import axios from 'axios'
import Constants from 'expo-constants'
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const OrderDetails = ({ route }) => {
  console.log('OrderDetail', route.params)
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderData = route.params.orderData;
        setOrder(orderData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderData();
  }, []);

  if (!order) {
    return <Text>Loading...</Text>;
  }

  const pay = () => {
    let orderMercado = [{
      title: 'Carlos',
      quantity: 1,
      unit_price: order.total_price,
    }]
    axios.post(apiUrl + 'paymments', orderMercado )
      .then((res) => {
        const initPoint = res.data.response.body.init_point
        Linking.openURL(initPoint)
      })
      .catch(err => console.log(err))
  }

  //el back espera recibir el carrito de esta manera :
  /* items: [{
              id: 123,
              title: carrito.title,
              currency_id: 'ARS',
              picture_url: carrito.picture_url,
              description: carrito.description,
              category_id: 'art',
              quantity: carrito.unit_price,
              unit_price: carrito.unit_price
          }] */

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Order Summary</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Order Number:</Text>
          <Text style={styles.text}>{order.n_order}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.text}>{order.total_price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.text}>{order.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.text}>{order.createdAt}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={pay}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  )
}

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.9

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: CARD_WIDTH,
    marginBottom: 16,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#62c060',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: CARD_WIDTH,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
