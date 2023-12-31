import React from 'react';
import { StyleSheet, Text, View, Image, FlatList,useWindowDimensions, ScrollView ,Pressable, ActivityIndicator} from 'react-native';
import products from '../products';
import { useSelector ,useDispatch} from 'react-redux';
import { cartSlice } from '../../store/CartSlice';
import { useGetProductQuery } from '../../store/apiSlice';
function ProductDetailsScreen({route}) {
  const id=route.params.id
  console.log(id)
  const{error,data,isLoading}=useGetProductQuery(id)
  const {width}=useWindowDimensions()
  const dispatch=useDispatch()
 
  const addToCart=()=>{
   dispatch(cartSlice.actions.addCartItem({product}))
    }
    
 if(error){
  return <Text>Error fetching the product {error.error}</Text>
 }

 if(isLoading){
  return <ActivityIndicator/>
 }

  console.log(data)
 const product=data
 
   return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <View >
              <Image source={{ uri: item }} style={{ width: width, aspectRatio: 1 }} />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        /> 
      <View style={{ padding: 20 }}> 
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      </ScrollView>
<Pressable onPress={addToCart} style={styles.button}>
    <Text style={styles.buttonText}>Add to Cart</Text>
</Pressable>
    </View>
  ); 
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: "500", 
        marginVertical: 10,
      },
      price: {
        fontWeight: "500",
        fontSize: 16,
        letterSpacing:1.5,
      },
      description: {
        marginVertical: 10,
        fontSize: 18,
        lineHeight: 30,
        fontWeight: "300",
      },
      image:{
        width:'100%', 
        height:"80%",
        aspectRatio:1,
      },
      button:{
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 100,
      
      },
      buttonText:{
        color:'white',
        fontWeight:'500',
        fontSize:16,
      }
});

export default ProductDetailsScreen;