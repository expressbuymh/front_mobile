import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export const ProductsCategory = () => {

  const [detailDataProduct, setDetailProdct] = useState()
  const [isExpanded, setExpanded] = useState(false)

  const data = [
    { id: 1, title: 'Tarjeta 1', description: "descripcion del procucto", price: 100 },
    { id: 2, title: 'Tarjeta 2', description: "descripcion del procucto", price: 100 },
    { id: 3, title: 'Tarjeta 3', description: "descripcion del procucto", price: 100 },
    { id: 4, title: 'Tarjeta 4', description: "descripcion del procucto", price: 100 },
    { id: 5, title: 'Tarjeta 5', description: "descripcion del procucto", price: 100 },
    { id: 6, title: 'Tarjeta 6', description: "descripcion del procucto", price: 100 },
    { id: 7, title: 'Tarjeta 7', description: "descripcion del procucto", price: 100 },
  ];

  const Card = ({ products }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.imgCard} source={{ uri: 'https://eldiariony.com/wp-content/uploads/sites/2/2022/10/semillas-de-manzana-shutterstock_1515666419.jpg?quality=75&strip=all&w=1200&h=800&crop=1' }} />
        </View>
        <Text style={styles.titleCard}>{products.title}</Text>
        <ScrollView style={styles.containDescription}>
          <Text style={styles.textDescription}>{products.description}</Text>
        </ScrollView>
        <Text style={styles.textPrice}>{`$${products.price}`}</Text>
        <TouchableOpacity style={styles.buttonCardDetails} onPress={() => toggleDetails(products)}>
          <Text>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCardCarts}>
          <MaterialIcons name='shopping-cart' size={20} color="black" />
          <Text>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const toggleDetails = (data) => {
    console.log(data)
    setDetailProdct(data)
    setExpanded(true)
  }

  const closeDetail = () => {
    setExpanded(false)
  }

  const generateCardPairs = () => {
    const cardPairs = [];
    const dataPairs = data.length % 2 === 0 ? data : data.slice(0, data.length - 1); // Obtener un nuevo array con pares de datos

    for (let i = 0; i < dataPairs.length; i += 2) {
      const card1 = dataPairs[i];
      const card2 = dataPairs[i + 1];
      cardPairs.push(
        <View key={i} style={styles.row}>
          <Card products={card1} />
          {card2 && <Card products={card2} />}
        </View>
      );
    }

    // Agregar tarjeta individual para el último elemento si la longitud de data es impar
    if (data.length % 2 !== 0) {
      const lastCard = data[data.length - 1];
      cardPairs.push(
        <View key={data.length} style={styles.row}>
          <Card products={lastCard} />
        </View>
      );
    }

    return cardPairs;
  };

  return (
    <>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>ProductsCategory</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Ionicons name="filter" size={24} color="black" />
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {generateCardPairs()}
      </ScrollView>

      <Modal visible={isExpanded} animationType="slide" transparent={true}>
        <TouchableOpacity onPress={closeDetail} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <View style={styles.cardDetail}>
            <View style={styles.imageContainer}>
              <Image style={styles.imgCard} source={{ uri: 'https://eldiariony.com/wp-content/uploads/sites/2/2022/10/semillas-de-manzana-shutterstock_1515666419.jpg?quality=75&strip=all&w=1200&h=800&crop=1' }} />
            </View>
            <Text style={styles.titleCard}>{detailDataProduct.title}</Text>
            <ScrollView style={styles.containDescription}>
              <Text style={styles.textDescription}>{detailDataProduct.description}</Text>
            </ScrollView>
            <Text style={styles.textPrice}>{`$${detailDataProduct.price}`}</Text>
            <TouchableOpacity style={styles.buttonCardCarts}>
              <MaterialIcons name='shopping-cart' size={20} color="black" />
              <Text>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </>
  )
}

/*  */
const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    height: 200,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    width: '48%',
    height: 500,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
  imageContainer: {
    width: '90%',
    height: 170,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'gray',
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
  },
  imgCard: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonCardDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '95%',
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
  },
  buttonCardCarts: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,164, 32, 0.7)',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '95%',
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
  },
  titleCard: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(70, 70, 70, 1)',
    padding: 6
  },
  textDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(90, 90, 90, 1)',
    padding: 6
  },
  containDescription: {
    width: '100%',
    height: 100,
  },
  textPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(100, 100, 100, 1)',
    padding: 6
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  cardDetail: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    height: 600,
    justifyContent: 'center',
    alignItems: 'center'
  }
});