import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

export const HomeProducts = () => {

  console.log('Esto es Home')

  return (
    <>
      <View style={styles.container} >
        <Swiper autoplay>
          <View style={styles.slide}>
            <Text style={styles.text}>Promo 1</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Promo 2</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Promo 3</Text>
          </View>
        </Swiper>
      </View>

      <View style={styles.containerMinPromos} >
        <View style={styles.subContainerMinPromos}>
          <Text style={styles.text}>caja1</Text>
        </View>
        <View style={styles.subContainerMinPromos}>
          <Text style={styles.text}>caja2</Text>
        </View>
        <View style={styles.subContainerMinPromos}>
          <Text style={styles.text}>caja3</Text>
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
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text2}>Slide 2</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text2}>Slide 3</Text>
            </View>
          </Swiper>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 300,
    backgroundColor: 'black',
  },
  containerMinPromos: {
    flexDirection: 'row',
    height: 200,
    backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subContainerMinPromos: {
    height: 180,
    width: '30%',
    backgroundColor: 'blue',
  },
  containerProducts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSlider: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  text2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})