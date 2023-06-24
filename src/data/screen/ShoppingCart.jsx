import React from 'react'
import { FlatList, Text,View,StyleSheet, Pressable } from 'react-native'
import CartListItem from '../../component/CartListItem'
 import { useSelector } from 'react-redux'
 import { selectSubtotal,selectDelivery ,total} from '../../store/CartSlice'
function ShoppingCart() {
  const cartItem=useSelector((state)=>state.cart.items)
  const subtotal=useSelector(selectSubtotal)
  const totals=useSelector(total)
  const deliveryfee=useSelector(selectDelivery)
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
<Pressable style={styles.button}>
  <Text style={styles.buttonText}>Checkout</Text>
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

