import React, { useEffect,useState } from 'react'
import { View, Text,Pressable, StyleSheet, Image, ScrollView,Dimensions, ActivityIndicator,TouchableOpacity,TextInput,SafeAreaView, Alert } from 'react-native'
  import { useNavigation } from '@react-navigation/native';
  import {useLoginUserMutation} from '../../store/apiSlice'
function SignUp() {
const [email, SetEmail] = useState('')
const [password, setPassword] = useState('')
const[loading,setLoading]=useState(false)
const navigation = useNavigation(); 

const windowWidth=Dimensions.get('window').width;
const  inputWidth=windowWidth*0.9
const buttonWidth=windowWidth*0.9
const logo="https://static.vecteezy.com/system/resources/previews/010/994/232/original/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg" 
const[loginUser,{data,error,Loading}]=useLoginUserMutation()

const  handlesubmit=async()=>{
  if(email==""&&password==""){
    Alert.alert("Please Enter Username and Password")
  }
  try
  {
  setLoading(true)
  const userDetais=
  {
    email,
    password
  }
  const response=await loginUser(userDetais)
  console.log(response)
  if(response.data?.status==="ok"){
    navigation.navigate('product');
  }else{
    Alert.alert("something went wrong")
  }
}catch(error){
console.log("something went wrong ",error)
}finally{
  setLoading(false)

}
}

  return (
    <SafeAreaView style={Style.container}>
    <ScrollView contentContainerStyle={Style.scrollContent}>
      <View style={Style.container}>
         <View>
        <Image source={{ uri: logo }} style={Style.image} />
        </View>
        <View style={{ marginLeft: 20, marginTop: 14 }}>
          <Text style={{color:'#000'}} >
            Email
          </Text>
          <TextInput
            style={[Style.input,{width:inputWidth}]}
            keyboardType='email-address'
            placeholder='Enter Your Email'
            placeholderTextColor="gray"
             onChangeText={(text) => SetEmail(text)}
          />
          <Text style={{color:'#000'}} >
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
          ):(<Text style={{ marginLeft: 130, marginTop: 13, color: '#fff', fontSize: 20 }} onPress={handlesubmit}  >Login</Text>)}
        </TouchableOpacity>
        <Text style={{ marginLeft: 20, marginTop: 20,color:'gray' }}>Don't Have an Account.
        <Text style={{ color: '#000' }} onPress={() => navigation.navigate('Signup')}>SignUp</Text>
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
      // Set background color to black
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft:140
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

});

export default SignUp;

 