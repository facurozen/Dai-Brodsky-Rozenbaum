import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function Registrarse() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    Email:'',
    Password: '',
  });

  const auth = getAuth()
  
  const signUp = () => {
    const obj = {
      email: user.Email,
      password: user.Password
    }

    let email = user.Email;
    let pass = user.Password;
    createUserWithEmailAndPassword(auth,email,pass)
      .then((userCredential) => {
        const useri = userCredential.user;
        setUser(useri)
        console.log("Usuario creado")
        navigation.navigate('Home', { user : useri })

      })
      .catch((error) => {
        console.error(error)
        console.log("El registro no pudo completarse")
      });
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registrarse</Text>
      <Input label='Email' placeholder='Ingrese su Email' value={user.Email} onChangeText={(text) => setUser({...user, Email:text })} opcion={false} />
      <Input label='Password' placeholder='Ingrese una Contraseña' value={user.Password} onChangeText={(text) => setUser({ ...user, Password: text })} opcion={true} />
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>¿Ya tienes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Iniciar Sesión</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor:'white',
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    width:'60vw',
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});