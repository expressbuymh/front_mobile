import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const NavBar = ( {navigation} ) => {
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const toggleMenu = () => {
    setMenuExpanded(!isMenuExpanded);
  };

  const closeMenu = () => {
    setMenuExpanded(false);
  };

  const menuItems = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
    { id: 5, title: 'Item 5' },
    { id: 6, title: 'Item 6' },
    { id: 7, title: 'Item 7' },
    { id: 8, title: 'Item 8' },
    { id: 9, title: 'Item 9' },
  ];

  const screenWidth = Dimensions.get('window').width;
  const menuWidth = screenWidth * 0.9;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleMenuItemPress(item.title)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
      <View style={styles.itemSeparator} />
    </TouchableOpacity>
  );

  const handleMenuItemPress = (title) => {
    navigation.navigate('ProductsCategory')
    console.log('Se hizo clic en el elemento:', title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={toggleMenu} style={styles.button}>
          <Ionicons name='menu' size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/favicon.png')} />
      </View>
      <Modal visible={isMenuExpanded} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[styles.menu, { width: menuWidth }]}>
            <FlatList
              data={menuItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(100, 10, 50, 1)',
    zIndex: 1,
  },
  container1: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(100, 10, 50, 1)',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 50,
    paddingLeft: 10,
  },
  menu: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  closeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
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
  itemSeparator: {
    height: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
});
