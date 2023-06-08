import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const NavBar = () => {
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const toggleMenu = () => {
    setMenuExpanded(!isMenuExpanded);
  };

  const closeMenu = () => {
    setMenuExpanded(false);
  };

  const menuItems = ['Item 1', 'Item 2', 'Item 3']; // Opciones del menú (pueden ser dinámicas)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        <Ionicons name={isMenuExpanded ? 'close' : 'menu'} size={24} color="white" />
      </TouchableOpacity>
      <Image source={require('../../assets/favicon.png')} />
      {isMenuExpanded && (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.menu}>
            {menuItems.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 100, // Cambio en la altura
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(100, 10, 50, 1)',
    zIndex: 1, // Asegura que el NavBar se muestre por encima de otros elementos
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  overlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
