import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { numberOfItems } from '../../store/CartSlice';
import ProductImage from './ProductImage';
import Signup from './Signup';
import Login from './Login';
import ProductDetailsScreen from './ProductDetailsScreen';
import ShoppingCart from './ShoppingCart';
import TrackOrder from './TrackOrder';
import MenuOption from './MenuOption';
import Profile from './Profile'
const Stack = createNativeStackNavigator();

export default function Navigations() {
  const numberOfItem = useSelector(numberOfItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track the menu state

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  const handleLogoutPress = () => {
    // Perform logout logic
    console.log('Logout pressed');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: 'white' },
          headerStyle: { backgroundColor: 'white' },
        }}
        initialRouteName='Signup'
      >
        <Stack.Screen
          name="product"
          component={ProductImage}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={{ flexDirection: 'row' }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>{numberOfItem}</Text>
              </Pressable>
            ),
            headerLeft: () => (
              <View style={styles.menuButtonContainer}>
                <Pressable onPress={handleMenuPress} style={styles.menuButton}>
                  <MaterialCommunityIcons name="menu" size={24} color="black" />
                </Pressable>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="product Details"
          component={ProductDetailsScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="Track Order" component={TrackOrder} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <Pressable style={styles.overlay} onPress={handleMenuPress}>
          <MenuOption onLogoutPress={handleLogoutPress} />
        </Pressable>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    marginLeft: 10,
  },
  menuButton: {
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
