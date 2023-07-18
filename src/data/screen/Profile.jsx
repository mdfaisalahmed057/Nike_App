import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FaUser } from 'react-native';

const Profile = () => {
  
  return (
    <View style={styles.container}>
      
      <FaUser size={30} color="#900" />
      <Text style={styles.name}>username</Text>
      <Text style={styles.email}>"user.email"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
});

export default Profile;