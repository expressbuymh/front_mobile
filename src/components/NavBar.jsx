import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, FlatList, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const NavBar = () => {
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const toggleMenu = () => {
    setMenuExpanded(!isMenuExpanded);
  };

  const closeMenu = () => {
    setMenuExpanded(false);
  };

  const menuItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 8', 'Item 8', 'Item 8', 'Item 8', 'Item 8', 'Item 8', 'Item 8', 'Item 8', 'Item 8', 'Item 8',
  ];

  const screenWidth = Dimensions.get('window').width;
  const menuWidth = screenWidth * 0.9;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
      <View style={styles.itemSeparator} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={toggleMenu} style={styles.button}>
          <Ionicons name={isMenuExpanded ? 'close' : 'menu'} size={24} color="white" />
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
              keyExtractor={(item, index) => index.toString()}
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

