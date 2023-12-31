import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import  Navigations from './src/data/screen/Navigations';
 import { Provider } from 'react-redux';
 import {store} from './src/store'
  export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>  
        <Navigations />
        <StatusBar style="auto" />
      </View>
    </Provider>
    
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor:"#fff"
  },
 
});
