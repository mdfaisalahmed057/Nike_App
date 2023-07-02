 import { StyleSheet, Text, View,Image,FlatList, Pressable, ActivityIndicator } from 'react-native';
 import { useSelector,useDispatch} from 'react-redux';
import { productSlice } from '../../store/productSlice';
import { useGetProductQuery } from '../../store/apiSlice';
import { useEffect ,useState} from 'react';
  export default function ProductImage({navigation}) {

    const [details, setDetails] = useState([]);

    useEffect(() => {
      const fetching = async () => {
        try {
          const res = await fetch("http://localhost:3006/proucts");
          const data = await res.json(); // Parse response as JSON
          console.log(data); // Debug: Log the parsed data
          setDetails(data); // Update state with the parsed data
        } catch (err) {
          console.log(err);
        }
      };
      fetching();
    }, []);
  
    console.log(details); 
 
  const products=useSelector((state)=>state.products.products)
  const dispatch=useDispatch()

  const{data,error,isLoading}=useGetProductQuery()
if(isLoading){
  return <ActivityIndicator/>
}
if(error){
  console.log(error)
  return <Text>{error.error}</Text> 
}
const product=data
console.log(product)
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
  