 import { StyleSheet, Text, View,Image,FlatList, Pressable, ActivityIndicator } from 'react-native';
 import { useSelector,useDispatch} from 'react-redux';
import { productSlice } from '../../store/productSlice';
import { useGetProductQuery } from '../../store/apiSlice';
import { useGetProductsQuery } from '../../store/apiSlice';
import { useEffect ,useState} from 'react';
export default function ProductImage({navigation}) {

  
  

const{data,error,isLoading}=useGetProductsQuery()
if(isLoading){
  return <ActivityIndicator/>
}
if(error){
  console.log(error) 
  return <Text>{error.error}</Text> 
}
const product=data
  
   return (
    <>
    <FlatList
      data={product}
      renderItem={({ item }) => (
        <View style={styles.imagecontainer}>
          <Pressable
            onPress={() => {
               navigation.navigate('product Details',{id:item._id});
            }}
          >
          <Image source={{ uri: item.image }} style={styles.image} />
          </Pressable>
 
        </View>

      )}
    
      numColumns={2}
    />
   
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagecontainer:{
  width:"50%"
    },
    image:{
      width:"100%",
      aspectRatio:1,
    },
  });
  