import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons'
import ShoppingCart from './ShoppingCart';
import ProductImage from './ProductImage';
import ProductDetailsScreen from './ProductDetailsScreen';
import { Pressable,Text } from 'react-native';
import { useSelector } from 'react-redux';
import { numberOfItems } from '../../store/CartSlice';
export default function Navigations() {
    const stack=createNativeStackNavigator();
const numberOfItem=useSelector(numberOfItems)
  return (
    <NavigationContainer>
         <stack.Navigator 
         screenOptions={{contentStyle:{backgroundColor:'white'}}}>
            <stack.Screen 
            name="product" 
            component={ProductImage} 
             options={({navigation})=>({
              headerRight:()=>(

                <Pressable 
                onPress={()=>navigation.navigate('Cart')}
                 style={{flexDirection:'row'}}>
                  
               <FontAwesome5 name="shopping-cart" size={18} color="gray"/>
              <Text style={{marginLeft:5,fontWeight:'500'}}>{numberOfItem}</Text>
                 </Pressable>
              )
            })}
             />
            <stack.Screen 
             name="product Details"
             component={ProductDetailsScreen} 
             options={{ presentation: 'modal' }}
              />

            <stack.Screen name="Cart" component={ShoppingCart}/>
        </stack.Navigator>
        </NavigationContainer>
      
  )
}

