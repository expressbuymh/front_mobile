import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

export const OrderDetails = ({ route }) => {
  console.log('OrderDetail',route.params)
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Aquí puedes realizar una llamada a la API o configurar la lógica para obtener los datos del pedido
    // y luego actualizar la variable de estado `order` con los datos obtenidos
    const fetchOrderData = async () => {
      try {
        // Lógica para obtener los datos del pedido utilizando route.params
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
      <TouchableOpacity style={styles.button}>
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
