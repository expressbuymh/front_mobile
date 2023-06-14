import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, ImageBackground, FlatList } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItemMas } from '../../redux/actions/cartActions';
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const ProductsCategory = ({ route }) => {
  const data = useSelector((state) => state.cart.cart)
  const cartData = useSelector(state => state.cart.items)
  let cartDataId = data._id
  const dispatch = useDispatch()
  const [detailDataProduct, setDetailProdct] = useState()
  const [isExpanded, setExpanded] = useState(false)
  const [isFilterExpanded, setFilter] = useState(false)
  const [subCategories, setSubCategories] = useState()
  const [dataProducts, setDataProducts] = useState([])
  const [headers, setHeaders] = useState()

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

  useEffect(() => {
    const fetchData = async () => {
      const headers = await getHeaders();
      //console.log('cart Data', cartData?.products[0].product_id.photo);
      setHeaders(headers)
    }
    fetchData();
  }, []);

  const filterNonPrintableChars = (str) => {
    return str.replace(/[^\x20-\x7E]/g, '');
  }

  useEffect(
    () => {
      axios.get(apiUrl + 'menu')
        .then(res => {
          /* let subCategories = res.data.subcategories
          const filterSubCategory = subCategories.filter(item => item._id == route.params.category_id)
          console.log('PIPO', filterNonPrintableChars(subCategories[0]._id) === filterNonPrintableChars(route.params.category_id));
          console.log('PIPO', subCategories[0]._id.split('').map(c => c.charCodeAt(0)));
          console.log('PIPO', route.params.category_id.split('').map(c => c.charCodeAt(0)));
          console.log('PIPO', route.params.category_id, subCategories[0]._id);
          console.log('filtro', filterSubCategory) */
          setSubCategories(res.data.subcategories)
        })
        .catch(err => console.log(err))
      console.log(route.params.category_id)
      console.log(route.params.category_name)
      axios.get(apiUrl + `products?category_id=${route.params.category_id}`)
        .then(res => {
          //console.log(res.data.products)
          setDataProducts(res.data.products)
        })
        .catch(err => console.log(err))
    }, [route.params.category_id]
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

  const Card = ({ products }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.imgCard} source={{ uri: `${products?.photo}` }} />
        </View>
        <Text style={styles.titleCard}>{products?.name}</Text>
        {/* <ScrollView style={styles.containDescription}>
          <Text style={styles.textDescription}>{products?.description}</Text>
        </ScrollView> */}
        <Text style={styles.textPrice}>{`$${products?.price}`}</Text>
       <View style={{flexDirection: 'column', width: '90%', alignItems: 'center',}}>
        <TouchableOpacity style={styles.buttonCardDetails} onPress={() => toggleDetails(products)}>
            <Text>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCardCarts}>
            <MaterialIcons name='shopping-cart' size={20} color="white" />
            <Text style={styles.textButtonAddCart}>Add to Cart</Text>
          </TouchableOpacity>
       </View>
      </View>
    )
  }

  const toggleDetails = (data) => {
    console.log(data)
    setDetailProdct(data)
    setExpanded(true)
  }

  const toggleFilter = () => {
    setFilter(true)
  }

  const closeDetail = () => {
    setExpanded(false)
    setFilter(false)
  }

  const generateCardPairs = () => {
    const cardPairs = [];
    const dataPairs = dataProducts.length % 2 === 0 ? dataProducts : dataProducts.slice(0, dataProducts.length - 1); // Obtener un nuevo array con pares de datos
    for (let i = 0; i < dataPairs.length; i += 2) {
      const card1 = dataPairs[i]
      const card2 = dataPairs[i + 1]
      cardPairs.push(
        <View key={i} style={styles.row}>
          <Card products={card1} />
          {card2 && <Card products={card2} />}
        </View>
      )
    }

    // Agregar tarjeta individual para el último elemento si la longitud de data es impar
    if (dataProducts.length % 2 !== 0) {
      const lastCard = dataProducts[dataProducts.length - 1];
      cardPairs.push(
        <View key={dataProducts.length} style={styles.row}>
          <Card products={lastCard} />
        </View>
      )
    }

    return cardPairs;
  }

  const addProduct = (product) => {
    let data = {
      product_id: product._id,
      quantity: 1
    }
    let dataProduct = {
      product_id: {
        _id: product._id,
        name: product.name,
        photo: product.photo,
        price: product.price
      },
      quantity: 1
    }

    const existingProduct = cartData.find(item => item.product_id._id === product._id)
    if (existingProduct) {
      data.quantity = existingProduct.quantity + 1
      dataProduct.quantity = data.quantity

      axios.post(apiUrl + `carts/addproducts/${cartDataId}`, data, headers)
        .then(res => {
          console.log(res)
          dispatch(updateCartItemMas(dataProduct))
        })
        .catch(err => console.log(err))
    } else {

      axios.post(apiUrl + `carts/addproducts/${cartDataId}`, data, headers)
        .then(res => {
          console.log(res)
          dispatch(addToCart([dataProduct]))
        })
        .catch(err => console.log(err))
    }
  }


  return (
    <>
      <ImageBackground source={require('../../assets/categories.jpg')} style={styles.containerHeader}>
        <View style={styles.headerTextContent}>
          <Text style={styles.textHeader}>{route.params.category_name.toUpperCase()}</Text>
        </View>
      </ImageBackground>
      <TouchableOpacity style={styles.buttonContainer} onPress={toggleFilter}>
        <Ionicons name="filter" size={24} color="black" />
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>

      <Modal visible={isFilterExpanded} animationType="slide" transparent={true}>
        <View style={styles.overlayFilter}>
          <TouchableOpacity onPress={closeDetail} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.contentFilter}>
            <FlatList
              data={subCategories}
              renderItem={renderItem}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.container}>
        {generateCardPairs()}
      </ScrollView>

      <Modal visible={isExpanded} animationType="slide" transparent={true}>
        <TouchableOpacity onPress={closeDetail} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <View style={styles.cardDetail}>
            <View style={styles.imageContainer2}>
              <Image style={{resizeMode: 'cover', flex: 1}} source={{ uri: `${detailDataProduct?.photo}` }} />
            </View>
            <Text style={styles.titleCardDetail}>{detailDataProduct?.name}</Text>
            <ScrollView style={styles.containDescription}>
              <Text style={styles.textDescription}>{detailDataProduct?.description}</Text>
            </ScrollView>
            <Text style={styles.textPrice}>{`$${detailDataProduct?.price}`}</Text>
            <TouchableOpacity style={styles.buttonCardCarts} onPress={() => addProduct(detailDataProduct)}>
              <MaterialIcons name='shopping-cart' size={20} color="black" />
              <Text style={styles.textButtonAddCart}>Add to Cart</Text>
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
  headerTextContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  textHeader: {
    fontWeight: '900',
    fontSize: 30,
    color: '#4F46E5',
    letterSpacing: 2,
    fontStyle: 'italic'
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
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'rgba(200, 200, 200, 0.7)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5
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
  imageContainer2: {
    width: '90%',
    height: 400,
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
    resizeMode: 'contain',
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
    backgroundColor: '#4F46E5',
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4F46E5',
    padding: 6
  },
  titleCardDetail: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4F46E5',
    padding: 6
  },
  textDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(90, 90, 90, 1)',
    padding: 6,
    textAlign: 'center'
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
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentFilter: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '80%'
  },
  overlayFilter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  textButtonAddCart: {
    color: 'white'
  }
});