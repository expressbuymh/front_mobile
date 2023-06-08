import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export const ProductsCategory = () => {

  const data = [
    { id: 1, title: 'Tarjeta 1' },
    { id: 2, title: 'Tarjeta 2' },
    { id: 3, title: 'Tarjeta 3' },
    { id: 4, title: 'Tarjeta 4' },
    { id: 5, title: 'Tarjeta 5' },
    { id: 6, title: 'Tarjeta 6' },
  ];

  const Card = ({ title }) => {
    return (
      <View style={styles.card}>
        <Text>{title}</Text>
      </View>
    );
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
        {data.map((item) => (
          <View key={item.id} style={styles.row}>
            <Card title={item.title} />
            <Card title={item.title} />
          </View>
        ))}
      </ScrollView>
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
    height: 150,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});