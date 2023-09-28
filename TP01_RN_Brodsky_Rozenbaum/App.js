import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/screens/Login'
import Registrarse from './src/screens/Registrarse'
import {useState} from 'react'
import Home from './src/screens/Home';
import Perfil from'./src/screens/Perfil';

const Stack = createNativeStackNavigator(); // Add this line

export default function App() {
  const [usuario, setUsuario] = useState({});
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer fallback>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          <Stack.Screen name="Registrarse" component={Registrarse} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          
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
