import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  import { useState } from 'react';
  import { useGetOrderQuery } from '../../store/apiSlice';
 function TrackOrder() {
    const[ref,setRef]=useState('')
    const{data,isLoading,error}=useGetOrderQuery(ref)
    console.log(data)
  return (
    <View style={styles.root}>
      
        <TextInput
        style={styles.inut}
        value={ref}
        onChangeText={setRef}
        placeholder='Your order reference'
        />

        {isLoading&& <ActivityIndicator/>}
         {data?.status!=='ok'&& <Text>order Not Found</Text>}
        {data?.status ==='ok' && <Text>{JSON.stringify(data.data,null,2)}</Text>}
     </View>
  )
}
const styles = StyleSheet.create({
    root: {
      padding: 10,
    },
    input: {
      borderColor: 'lightgrey',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
  });

export default TrackOrder
