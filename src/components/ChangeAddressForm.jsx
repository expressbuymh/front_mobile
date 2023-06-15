import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { useState, useEffect } from "react"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'


function ChangeAddressForm({ route, navigation }) {
    // route.params.address._id
    const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

    const [address_line, setAddress_line] = useState(route.params.address.address_line)
    const [city, setCity] = useState(route.params.address.city)
    const [country, setCountry] = useState(route.params.address.country)
    const [state, setState] = useState(route.params.address.state)
    const [zip_code, setZip_code] = useState(route.params.address.zip_code)
    const [telephone, setTelephone] = useState(route.params.address.telephone)
    const [addressName, setAddressName] = useState(route.params.address.name)
    const [token, setToken] = useState()

    let getToken = async () => {
        try {
          let token = await AsyncStorage.getItem('token');
          setToken(token);
        } catch (error) {
          console.log('Error al obtener el token:', error);
          return null;
        }
      }

      let headersVr = { headers: { 'Authorization': `Bearer ${token}` } };
      
      const userData =  {
        address_line: address_line,
        city: city,
        country: country,
        state: state,
        zip_code: zip_code,
        telephone: telephone,
        name: addressName
    }


    useEffect(() => {
        getToken()
    }, [])

    function uptdAddress(data, headers) {
        console.log(route.params.address._id)
        Alert.alert('Save changes', 'Are you sure?', [
            {
                text: 'Yes',
                onPress: () => {
                    axios.put(apiUrl+`addresses/${route.params.address._id}`, data, headers)
                        .then(res => {
                            if(res.data.success) {
                                Alert.alert('Update address', 'Address updated successfully', [
                                    {
                                        text: 'Close',
                                        style: 'cancel',
                                        onPress: () => {
                                            navigation.navigate('Profile')
                                        }
                                    }
                                ])
                            }
                        })
                        .catch(err => console.log(err))
                }
            },
            {
                text: 'Cancel',
                onPress: () => {
                    console.log('Cancel pressed')
                }
            }
        ])
        
    }
 
    return (
        <View style={{ height: '100%'}}>
            <View style={{ backgroundColor: '#4F46E5', height: '20%', justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>Edit your address</Text>
            </View>

            <View style={{ backgroundColor: '#ddd', height: 'auto', margin: 10, borderRadius: 6, padding: 17, marginTop: 20, borderWidth: 1, borderColor: '#4F46E5bb'}}>
            
            <View style={{marginBottom: 12}}>
                    <Text>Name</Text>
                    <View>
                        <View>
                            <TextInput
                                defaultValue={route.params.address.name}
                                onChangeText={text => setAddressName(text)}
                                placeholder={route.params.address.name}
                                style={{ padding: 4, borderWidth: 1, borderColor: '#000', borderRadius: 4 }}
                            />
                        </View>
                    </View>
                </View>
                
                <View style={{marginBottom: 12}}>
                    <Text>Address line</Text>
                    <View>
                        <View>
                            <TextInput
                                defaultValue={route.params.address.address_line}
                                onChangeText={text => setAddress_line(text)}
                                placeholder={route.params.address.address_line}
                                style={{ padding: 4, borderWidth: 1, borderColor: '#000', borderRadius: 4 }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginBottom: 12}}>
                    <Text>City</Text>
                    <View>
                        <View>
                            <TextInput
                                onChangeText={text => setCity(text)}
                                placeholder={route.params.address.city}
                                style={{ padding: 4, borderWidth: 1, borderColor: '#000', borderRadius: 4 }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginBottom: 12}}>
                    <Text>Country</Text>
                    <View>
                        <View>
                            <TextInput
                                onChangeText={text => setCountry(text)}
                                placeholder={route.params.address.country}
                                style={{ padding: 4, borderWidth: 1, borderColor: '#000', borderRadius: 4 }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginBottom: 12}}>
                    <Text>State</Text>
                    <View>
                        <View>
                            <TextInput
                                onChangeText={text => setState(text)}
                                placeholder={route.params.address.state}
                                style={{ padding: 4, borderWidth: 1, borderColor: '#000', borderRadius: 4 }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginBottom: 12}}>
                    <Text>Zip code</Text>
                    <View>
                        <View>
                            <TextInput
                                onChangeText={text => setZip_code(text)}
                                placeholder={route.params.address.zip_code.toString()}
                                style={{ padding: 4, borderWidth: 1, borderColor: '#000', borderRadius: 4 }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginBottom: 12}}>
                    <Text>Telephone</Text>
                    <View>
                        <View>
                            <TextInput
                                onChangeText={text => setTelephone(text)}
                                placeholder={route.params.address.telephone.toString()}
                                style={{ padding: 4, borderWidth: 1, borderColor: '#000', borderRadius: 4 }}
                            />
                        </View>
                    </View>
                </View>

            </View>

            <TouchableOpacity style={{backgroundColor: '#4F46E5', width: '30%', alignSelf: 'center', padding:10, borderRadius: 10, marginTop: 12}} onPress={() => {uptdAddress(userData, headersVr)}}>
                <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>Save Changes</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ChangeAddressForm