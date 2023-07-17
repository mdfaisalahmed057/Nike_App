import React, { useEffect,useState } from 'react'
import { View, Text,Pressable, StyleSheet, Image, ScrollView,Dimensions, ActivityIndicator,TouchableOpacity,TextInput,SafeAreaView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {  useCreateUserMutation } from '../../store/apiSlice'
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { setUsernameof, setPhoneof, setEmailof } from '../../store/autSlice';
function SignUp() {
 const logo="https://static.vecteezy.com/system/resources/previews/010/994/232/original/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg" 
const [email, SetEmail] = useState('')
const [password, setPassword] = useState('')
const [phone, setPhone] = useState('')
const [username, setUsername] = useState('')
const[loading,setLoading]=useState(false)
const navigation = useNavigation();  
const[createUser,{data,error,Loading}]=useCreateUserMutation()
const windowWidth=Dimensions.get('window').width;
const  inputWidth=windowWidth*0.9
const buttonWidth=windowWidth*0.9

const dispatch=useDispatch()

const handleSubmit = async () => {
  if(email==""&&password==""){
    Alert.alert("please enter all the field")
    return
  }
  try {
    setLoading(true);

    const newUser = {
      email,
      username,
      phone_no: phone,
      password,
    };
    

    const response = await createUser(newUser)
    console.log(response);

    if (response.data?.status === 'ok') {
      Alert.alert('User has been created successfully');
      dispatch(setUsernameof(username))
      dispatch(setPhoneof(phone))
      dispatch(setEmailof(email))
      navigation.navigate('product');
    } else {
      Alert.alert('Something went wrong');
    }
  } catch (error) {
     Alert.alert('Something went wrong',error);
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={Style.container}>
    <ScrollView contentContainerStyle={Style.scrollContent}>
      <View style={Style.container}>
        <View  style={Style.imageContainer}>
        <Image source={{ uri: logo }} style={Style.image} />
        </View>
        <View style={{ marginLeft: 20, marginTop: 14 }}>
        <Text style={Style.label} >
            Username
          </Text>
        <TextInput
            style={[Style.input,{width:inputWidth}]}
            placeholder='Enter Your username'
             placeholderTextColor="gray"
            onChangeText={(text) => setUsername(text)}
          />

          <Text style={Style.label} >
            Email
          </Text>
          <TextInput 
            style={[Style.input,{width:inputWidth}]} 
            keyboardType='email-address'
            placeholder='Enter Your Email'
            placeholderTextColor="gray"
             onChangeText={(text) => SetEmail(text)}
          />
            <Text style={Style.label} >
            Pho.no
          </Text>
             <TextInput
            style={[Style.input,{width:inputWidth}]}
            placeholder='Enter Your Phone No'
            keyboardType='numeric'
             placeholderTextColor="gray"
            onChangeText={(text) => setPhone(text)}
          />
          <Text style={Style.label} >
            Password
          </Text>
          <TextInput
            style={[Style.input,{width:inputWidth}]}
            placeholder='Enter Your Password'
            secureTextEntry={true}
            placeholderTextColor="gray"
            onChangeText={(text) => setPassword(text)}
          />
           
         </View> 
        <TouchableOpacity style={[Style.button,{width:buttonWidth}]}>
          {loading?(
          <ActivityIndicator color="#fff" size="small"/>
          ):(<Text onPress={handleSubmit} style={{ marginLeft: 130, marginTop: 13, color: '#fff', fontSize: 20 }} >SignUp</Text>)}
        </TouchableOpacity>
        <Text style={{ marginLeft: 20, marginTop: 20,color:'gray' }}>Already have an Account.
        <Text style={{ color: '#000' }} onPress={() => navigation.navigate('Login')}>Login</Text>
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}
const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
      // Set background color to gray
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  header: {
    color: "#000",
      marginLeft: 20,
    fontSize: 30,
    fontWeight: "500",
    marginLeft:130
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D3D3D3",
    color: "#D3D3D3",
    marginTop: 10,
    width: "90%",
    height: 50,
    textAlign: "left",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    width: "88%",
    height: 50,
    marginLeft: 20,
    borderColor: "#fff",
    borderRadius: 100,
    marginTop: 10,
  },
  
  label:{
    color:'#000',
    fontSize:16,
    fontWeight:'500'
  },
  smallText: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-start',
    }
});

export default SignUp;

 