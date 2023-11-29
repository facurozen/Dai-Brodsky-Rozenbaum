import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Login from './src/screens/Login'
import Registrarse from './src/screens/Registrarse'
import { useState,useEffect } from 'react';
import Home from './src/screens/Home';
import Perfil from'./src/screens/Perfil';
import Comics from'./src/screens/Comics';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Personajes from './src/screens/Personajes';


const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyC7KZWX1FL1DoRvGvNWuQf7nMblC3j50O0",
  authDomain: "dai-brodsky-rozenbaum-jaichi.firebaseapp.com",
  projectId: "dai-brodsky-rozenbaum-jaichi",
  storageBucket: "dai-brodsky-rozenbaum-jaichi.appspot.com",
  messagingSenderId: "183232513838",
  appId: "1:183232513838:web:36dcb1c4e6d818fcd7dcbf",
  measurementId: "G-806H98ZRZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  const [usuario, setUsuario] = useState({});
  
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer fallback>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* https://developer.marvel.com/docs#!/public/getComicIndividual_get_7 Documentación (API)*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Personajes" component={Personajes} />

        <Stack.Screen name="Comics" component={Comics} />
          <Stack.Screen name="Registrarse" component={Registrarse} />
          <Stack.Screen name="Perfil" component={Perfil} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff"
  }
})
