 import { StyleSheet, Text, View,Image,FlatList, Pressable } from 'react-native';
 import { useSelector,useDispatch} from 'react-redux';
import { productSlice } from '../../store/productSlice';

 export default function ProductImage({navigation}) {
  const products=useSelector((state)=>state.products.products)
  const dispatch=useDispatch()
  return (
    <>
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View style={styles.imagecontainer}>
          <Pressable
            onPress={() => {
              dispatch(productSlice.actions.setSelectedProduct(item.id))
              navigation.navigate('product Details');
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
  