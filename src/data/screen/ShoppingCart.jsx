import React from 'react'
import { FlatList, Text,View,StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native'
import CartListItem from '../../component/CartListItem'
 import { useDispatch, useSelector } from 'react-redux'
 import { selectSubtotal,selectDelivery ,total,cartSlice} from '../../store/CartSlice'
 import { useCreateOrderMutation } from '../../store/apiSlice'
 import { authSlice } from '../../store/autSlice'
function ShoppingCart() {
  const cartItem=useSelector((state)=>state.cart.items)
  const auth=useSelector((state)=>state.auth)
  const subtotal=useSelector(selectSubtotal)
  const totals=useSelector(total)
  const deliveryfee=useSelector(selectDelivery)
  const dispatch=useDispatch()
  const[createOrder,{data,error,isLoading}]=useCreateOrderMutation()
  
    const onCreateOrder=async()=>{
    const result=await createOrder({
      items:cartItem,
      subtotal,
      deliveryfee,
      total,
      customer:auth
    })
    if(result.data?.status==='ok'){
      Alert.alert(
        'order has been submitted',
        `Your order reference is:${result.data.data.ref}`
      )
      dispatch(cartSlice.actions.clear())
    }
   }
  return (
    <>
    <FlatList
      data={cartItem}
      renderItem={({ item }) => (
        <CartListItem cartItem={item} />)}

      ListFooterComponent={() => (
        <View style={styles.totalsContainer}>
          <View style={styles.row}>
            <Text style={styles.text}>Delivery</Text>
            <Text style={styles.text}>{deliveryfee}us$</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>subtotal</Text>
            <Text style={styles.text}>{subtotal}US$</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textBold}>Total</Text>
            <Text style={styles.textBold}>{totals}US$</Text>
          </View>
        </View>
      )}
    />
    <View style={styles.footer}>
<Pressable onPress={onCreateOrder} style={styles.button}>
  <Text style={styles.buttonText}>
    Checkout
    {isLoading&& <ActivityIndicator/>}
    </Text>
</Pressable>
    </View>
    
    </>
  )
}
export default ShoppingCart

const styles=StyleSheet.create({
  totalsContainer:{
    margin:20,
    paddingTop:10,
    borderColor:'gainsboro',
    borderTopWidth:1,
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:2,
  },
  text:{
    fontSize:16,
    color:"gray",
  },
  textBold:{
    fontSize:16,
    fontWeight:"500"
    
  },
  footer:{
    position:"absolute",
    bottom:0,
    width:"100%",
    backgroundColor:"white",
    borderColor:"gainsboro",
    borderTopWidth:1,
    padding:20,
    borderRadius:100
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
})

