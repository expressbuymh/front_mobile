import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions, Image, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'

export const HomeProducts = () => {

  console.log('Esto es Home')

  return (
    <>
      <ScrollView>
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

        <View style={styles.containerMinPromos} >
          <View style={styles.subContainerMinPromos}>
            <Image style={styles.image} source={require('../../assets/prom1.png')} />
            <Text style={styles.textMinProm}>For purchases over $100 shipping is free.</Text>
          </View>
          <View style={styles.subContainerMinPromos}>
            <Image style={styles.image} source={require('../../assets/prom2.png')} />
            <Text style={styles.textMinProm}>buy online and pick up in store</Text>
          </View>
          <View style={styles.subContainerMinPromos}>
            <Image style={styles.image} source={require('../../assets/prom3.png')} />
            <Text style={styles.textMinProm}>For purchases with your pipo card get a 10% discount</Text>
          </View>
        </View>

        <View style={styles.containerProducts}>
          <View style={styles.containerSlider}>
            <Swiper
              autoplay
              loop
              showsPagination={false}
            >
              <View style={styles.slide2}>
                <Text style={styles.text2}>Slide 1</Text>
                <View style={styles.cardImg}>
                  <Image style={styles.img} source={{ uri: 'https://eldiariony.com/wp-content/uploads/sites/2/2022/10/semillas-de-manzana-shutterstock_1515666419.jpg?quality=75&strip=all&w=1200&h=800&crop=1' }} />
                </View>
                <Text style={styles.text2}>  Price: $30 </Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text2}>Slide 1</Text>
                <View style={styles.cardImg}>
                  <Image style={styles.img} source={{ uri: 'https://eldiariony.com/wp-content/uploads/sites/2/2022/10/semillas-de-manzana-shutterstock_1515666419.jpg?quality=75&strip=all&w=1200&h=800&crop=1' }} />
                </View>
                <Text style={styles.text2}>  Price: $30 </Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text2}>Slide 1</Text>
                <View style={styles.cardImg}>
                  <Image style={styles.img} source={{ uri: 'https://eldiariony.com/wp-content/uploads/sites/2/2022/10/semillas-de-manzana-shutterstock_1515666419.jpg?quality=75&strip=all&w=1200&h=800&crop=1' }} />
                </View>
                <Text style={styles.text2}>  Price: $30 </Text>
              </View>
            </Swiper>
          </View>
        </View>
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
    paddingHorizontal: 10
  },
  subContainerMinPromos: {
    height: 180,
    width: '30%',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  containerProducts: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 400,
    paddingTop: 5
  },
  containerSlider: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(70, 170 ,0, 0.7)',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  slide2: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    //backgroundColor: 'skyblue',
    borderColor: 'rgba(70, 70 ,70, 0.7)',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  text2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  img: {
    flex: 1,
    width: '100%',
    height: 20,
  },
  cardImg: {
    height: '50%',
    width: '50%'
  },
  image: {
    width: '100%',
    height: '55%',
    resizeMode: 'contain',
  },
})