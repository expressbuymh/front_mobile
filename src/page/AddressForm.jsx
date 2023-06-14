import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
import Constants from 'expo-constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RadioButton } from 'react-native-paper'

const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/'

const AddressForm = () => {
  const data = useSelector((state) => state.cart.cart)
  let cartDataId = data._id
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [headers, setHeaders] = useState()
  const [telephone, setTelephone] = useState('')
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  let getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token')
      return token;
    } catch (error) {
      console.log('Error al obtener el token:', error)
      return null;
    }
  }

  let getHeaders = async () => {
    try {
      let token = await getToken();
      let headers = { headers: { 'Authorization': `Bearer ${token}` } }
      return headers;
    } catch (error) {
      console.log('Error al obtener las headers:', error)
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const headers = await getHeaders();
      setHeaders(headers)

      axios.get(apiUrl + 'addresses/me', headers)
        .then(res => {
          setAddresses(res.data.addresses)
        })
        .catch(err => console.log(err))
    }

    fetchData()
  }, [])

  const handleSubmit = () => {
    let data = {
      name: name,
      address_line: address,
      city: city,
      state: state,
      country: country,
      zip_code: zipCode,
      telephone: telephone
    }

    axios.post(apiUrl + 'addresses', data, headers)
      .then(res => {
        setShowAlert(true)
        setAlertMessage('Dirección creada exitosamente')
        setShowForm(false)
        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setZipCode('')
        setTelephone('')
        setAddresses([...addresses, res.data.address])
      })
      .catch(err => console.log(err))
  };

  const handleCancel = () => {
    setShowForm(false)
    setName('')
    setAddress('')
    setCity('')
    setState('')
    setCountry('')
    setZipCode('')
    setTelephone('')
  };

  const handleAddNewAddress = () => {
    setShowForm(true)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chooseAddressText}>Choose your shipping address:</Text>
      {addresses.map((address, index) => (
        <View key={index} style={styles.radioButtonContainer}>
          <RadioButton
            value={address._id}
            status={selectedAddress === address._id ? 'checked' : 'unchecked'}
            onPress={() => setSelectedAddress(address._id)}
            color="#6200EE"
          />
          <Text style={styles.radioButtonLabel}>{address.name}</Text>
        </View>
      ))}
      {showForm ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />
          <TextInput
            style={styles.input}
            placeholder="Zip code"
            value={zipCode}
            onChangeText={setZipCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Telephone"
            value={telephone}
            onChangeText={setTelephone}
          />
          <View style={styles.buttonContainer}>
            <Button title="Send" onPress={handleSubmit} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </>
      ) : (
        <View style={styles.addButtonContainer}>
          <Button title="Add new address" onPress={handleAddNewAddress} />
        </View>
      )}
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chooseAddressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonLabel: {
    marginLeft: 8,
  },
  addButtonContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  alertContainer: {
    backgroundColor: '#e0f7d5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  alertText: {
    color: '#006400',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default AddressForm
