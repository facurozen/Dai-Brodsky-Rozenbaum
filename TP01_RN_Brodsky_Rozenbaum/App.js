import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/screens/Login'
import Registrarse from './src/screens/Registrarse'
import React from 'react'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer fallback>
      <Stack.Navigator screenOptions={{ headerShown: true }}> 
        <Stack.Screen name="Registrarse" component={Registrarse} />
        <Stack.Screen name="Login" component={Login} />
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
