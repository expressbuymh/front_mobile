import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import axios from 'axios';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'

export const HomeProducts = () => {

  console.log('Esto es Home')

  const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';
  const [products, setProducts] = useState()

  useEffect(() => {

    axios.get(apiUrl + `products`)
      .then(res => {
        setProducts(res.data.products)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <>
      <ScrollView style={{backgroundColor: 'white', padding: 8 }}>
        <Text style={styles.textTitle}>EXPRESS BUY</Text>
        <View style={styles.container} >
          <Swiper autoplay>
            <View style={styles.slide}>
              <Image style={styles.img} source={{ uri: 'https://thumbs.dreamstime.com/b/concepto-para-un-cartel-publicitario-durante-las-promociones-una-tienda-de-bricolaje-publicidad-la-bandera-en-el-sector-diy-143733557.jpg' }} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{ uri: 'https://thumbs.dreamstime.com/b/concepto-para-un-cartel-publicitario-durante-las-promociones-una-tienda-de-bricolaje-publicidad-la-bandera-en-el-sector-diy-143733557.jpg' }} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.img} source={{ uri: 'https://thumbs.dreamstime.com/b/concepto-para-un-cartel-publicitario-durante-las-promociones-una-tienda-de-bricolaje-publicidad-la-bandera-en-el-sector-diy-143733557.jpg' }} />
            </View>
          </Swiper>
        </View>

        <View style={styles.containerMinPromos}>
          <TouchableOpacity style={styles.subContainerMinPromos} onPress={()=> {console.log('hola')}}>
            <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/expressbuy-finalchallenge.appspot.com/o/mobileImages%2Fhygiene-products%20(1).png?alt=media&token=3485749d-db23-4c7f-85ad-c9e8caa8c6f0'}} />
            <Text style={styles.textMinProm}>Hygiene Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subContainerMinPromos} onPress={()=> {console.log('hola')}}>
            <Image style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/expressbuy-finalchallenge.appspot.com/o/mobileImages%2Fbebida-alcoholica.png?alt=media&token=2cad5965-4139-43c2-bcd2-c2fe6a9e4aa1'}} />
            <Text style={styles.textMinProm}>Drinks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subContainerMinPromos} onPress={()=> {console.log('hola')}}>
            <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/expressbuy-finalchallenge.appspot.com/o/mobileImages%2Fcleaning.png?alt=media&token=35ff6758-4135-4588-b2f8-05f2b7054057' }} />
            <Text style={styles.textMinProm}>Products Cleaning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subContainerMinPromos} onPress={()=> {console.log('hola')}}>
            <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/expressbuy-finalchallenge.appspot.com/o/mobileImages%2Fproteins.png?alt=media&token=e05e6be5-f192-43b5-a90f-fac7a065c506' }} />
            <Text style={styles.textMinProm}>Meat and Fish</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ marginTop: 20, fontSize: 25, paddingLeft: 12, letterSpacing: 1, fontWeight:'500'}}>Featured Products</Text>

        <ScrollView
          horizontal
          pagingEnanbled
          style={{ paddingTop: 50, height: 400, display: 'flex', columnGap: 6 }}
        >
          {products?.map((prod) => {
              if(/*prod.discount_id.active*/prod.active) {
                return <View style={styles.productContainer} key={prod._id}>
                          <View style={styles.cardImg}>
                            <Image style={{resizeMode: 'contain', width: '100%', height: '100%'}} source={{ uri: `${prod.photo}` }} />
                          </View>
                          <View style={{ display: 'flex', rowGap: 50, width: '60%', alignItems: 'center'}}>
                            <View>
                              <Text style={styles.text2}>{prod.name}</Text>
                              <Text style={styles.text2}>{`Price: $ ${prod.price}`}</Text>
                            </View>
                            <View style={{ display: 'flex', alignItems: 'center', rowGap: 8}}>
                              <TouchableOpacity onPress={()=> {console.log('hola')}} style={{backgroundColor: 'red', padding: 6, width: 100, borderRadius: 7, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000'}} >
                                <Text style={{textAlign: 'center'}}>Details</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{display: 'flex', flexDirection: 'row',  width: 120, justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 6, backgroundColor: '#4F46E5'}}>
                                <MaterialIcons name='shopping-cart' size={20} color="white"/>
                                <Text style ={{color: 'white'}}>Add to Cart</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
              }
          })}

        </ScrollView>

      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 300,
    paddingVertical: 10,
  },
  containerMinPromos: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    height: 100,
    textAlignVertical: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  textMinProm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  subContainerMinPromos: {
    height: 150,
    width: '22%',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 6,
    backgroundColor: '#eee'
  },
  // containerProducts: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   height: 400,
  //   paddingTop: 5
  // },
  // containerSlider: {
  //   width: '100%',
  //   height: '100%',
  //   borderColor: 'black',
  //   borderWidth: 2,
  //   borderStyle: 'solid',
  // },
  productContainer: {
    width: 400,
    height: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderWidth: 2,
    borderColor: '#4F46E5',
    borderRadius: 10,
    marginLeft: 6
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardImg: {
    height: '100%',
    width: '50%',
  },
  image: {
    width: '100%',
    height: '55%',
    resizeMode: 'center'
  }
})