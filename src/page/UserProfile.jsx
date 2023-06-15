import { View, Text, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

function UserProfile({navigation}) {

    const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';
    const [userData, setUserData] = useState()
    const [nameValue, setNameValue] = useState(userData?.name)
    const [emailValue, setEmailValue] = useState(userData?.email)
    const [headers, setHeaders] = useState()
    const [address, setAddress] = useState()
    
    const goChangeAddressForm = (address) => {
        navigation.navigate('Edit address', { address })
    }

    const getUserData = async() => {
        let userData = JSON.parse(await AsyncStorage.getItem('user'))
        console.log(userData)
        setUserData(userData)
    }

    
    const newUserData = {
        name: nameValue,
        email: emailValue
    }
    
    const getToken = async() => {
        try {
            let token = await AsyncStorage.getItem('token')
            let headersVr = { headers: { 'Authorization': `Bearer ${token}` } };
            setHeaders(headersVr)
            return headersVr
        } catch (error) {
            console.log('Error al obtener el token:', error);
            return null;
        }
    }

   async function getUserAddresses() {
    let headers = await getToken()
        axios.get(apiUrl+'addresses/me', headers)
            .then(res => {
                console.log(res)
                setAddress(res.data.addresses)
            })
            .catch(err => console.log(err))
    }

    function deleteAdreess(id, headers){
        console.log(id)
        Alert.alert('Delete address', 'Are you sure?', [
            {
                text: 'Yes',
                onPress: ()=> {
                    axios.delete(apiUrl+`addresses/${id}`, headers)
                        .then(res => {
                            if(res.data.success) {
                                Alert.alert('Delete address', 'Address deleted successfully', [
                                    {
                                        text: 'Close',
                                        style: 'cancel'
                                    }
                                ])
                            }
                        })
                        .catch(err => console.log(err))
                }
            },
            {
                text: 'Cancel',
                onPress: ()=> {
                    console.log('Cancel pressed')
                }
            }
        ])
    }

    function editUser(data){
        console.log(data)
    }

    useEffect(() => {
        getUserData()
        getToken()
        getUserAddresses()
    }, [])


  return (
    <View style={{height: '100%'}}>

        <View style={{width: '100%', height: '25%', backgroundColor:'#4F46E5', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <Image source={{uri: `${userData?.photo}`}} style={{height: '45%', width: '20%', resizeMode: 'center', borderRadius: 70, borderWidth: 3, borderColor: '#4F46E5'}}/>
            <View style={{flexDirection: 'row', columnGap: 5,}}>
                <Text style={{fontSize: 25, fontWeight: '600'}}>{userData?.name.charAt(0).toUpperCase() + userData?.name.slice(1)}</Text>
                <Text style={{fontSize: 25, fontWeight: '600'}}>{userData?.last_name.charAt(0).toUpperCase() + userData?.last_name.slice(1)}</Text>
            </View>
        </View>
        {/* Editar data del usuario (probar mañana en la mañana) */}
        <View style={{ height: 'auto', margin: 10, marginTop: 20, borderRadius: 12, padding: 12, backgroundColor: '#ddd'}}>
            <View style={{flexDirection: 'row', gap: 12}}>
                <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 20, color: '#4F46E5'}}>Edit user info</Text>
                <Entypo name="info" size={24} color="black" />
            </View>
            <View>
                <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center', marginBottom: 20}}>
                    <TextInput 
                    placeholder='Name'
                    defaultValue={userData?.name}
                    onChangeText={text => setNameValue(text)}
                    style={{borderWidth: 1, borderColor: '#000', borderRadius: 12, height: 40, width: '80%', paddingLeft: 10}}
                    />
                    <TouchableOpacity style={{backgroundColor: '#4F46E5', padding: 11, borderRadius: 10}} onPress={()=>{editUser(newUserData)}}>
                        <Text style={{color: '#fff', letterSpacing: 1}}>Edit</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
                    <TextInput 
                    placeholder='Email'
                    defaultValue={userData?.email}
                    onChangeText={text => setEmailValue(text)}
                    style={{borderWidth: 1, borderColor: '#000', borderRadius: 12, height: 40, width: '80%', paddingLeft: 10}}
                    />
                    <TouchableOpacity style={{backgroundColor: '#4F46E5', padding: 11, borderRadius: 10}} onPress={()=>{editUser(newUserData)}}>
                        <Text style={{color: '#fff', letterSpacing: 1}}>Edit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

        <ScrollView style={{width: '100%', height: 'auto', margin: 10, marginTop: 20, borderRadius: 12, backgroundColor: '#ddd', padding: 12}}>
            <View style={{flexDirection: 'row', gap: 12}}>
                <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 20, color: '#4F46E5'}}>Your addresses</Text>
                <Entypo name="address" size={24} color="black" />
            </View>
            <View>
                { address?.map((add) => {
                    return <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center', marginBottom: 20}} key={add._id}>
                                <View style={{borderBottomWidth: 1, borderColor: '#4F46E5', width: '65%', alignItems: 'center', paddingVertical: 3, marginRight: 17, flexDirection: 'row'}}>
                                    <Entypo name="direction" size={18} color="black" />
                                    <Text style={{fontSize: 25, fontWeight: '500', marginLeft: 12}}>{add.name}</Text>
                                </View>
                                <TouchableOpacity style={{backgroundColor: '#4F46E5', padding: 11, borderRadius: 10}} onPress={()=>{goChangeAddressForm(add)}}>
                                    <Entypo name="pencil" size={18} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor: '#ff000099', padding: 11, borderRadius: 10}} onPress={()=>{deleteAdreess(add._id, headers)}}>
                                    <Entypo name="trash" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                }) }
            </View>
        </ScrollView>

    </View>
  )
}

export default UserProfile