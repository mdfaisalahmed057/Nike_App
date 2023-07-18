import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const MenuOption = ({ onLogoutPress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track the menu state

  const handleLogout = () => {
    onLogoutPress();
  };

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.optionText}>Profile</Text>
      </TouchableOpacity>
      {/* Add more options as needed */}
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Track Order')}>
        <Text style={styles.optionText}>Check Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default MenuOption;
