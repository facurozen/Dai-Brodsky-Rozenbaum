import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import axios from 'axios';

export default function Login() {
  const [usuario,setUsuario] = useState('');
  const [password,setPass] = useState('');
  const [mail,setMail] = useState('');
  const navigation = useNavigation();
  const[user,setUser] = useState({
    Email:"",
    Password: ""});
    const storedMail = localStorage.getItem('mail');
    const storedPass = localStorage.getItem('pass');
  const auth = getAuth()

  const login = () => {
    const obj = {
      email:mail,
      password: password
    }
    
    signInWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
      const userLogged = userCredential.user;
      const updateUserContext = async () => await setUser(userLogged)
      updateUserContext()
      console.log('Usuario logueado')
      localStorage.setItem('mail', mail); // guardo en user el mail y la contraseña
      localStorage.setItem('pass',password);
      navigation.navigate('Home', { user2: objNew })
    })
    .catch((error) => {
      console.error(error)
      console.log('user no encontrado');
    })
  }

  useEffect(()=>{
    if(storedMail){
      const objNew ={
        email:storedMail,
        password:storedPass
      }
      navigation.navigate('Home', { user2: objNew })
    }
  }),[storedMail]
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su usuario"
        value={mail}
        onChangeText={(text) => setMail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPass(text)}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>¿No tienes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate('Registrarse')}>Registrate</Text></Text>


      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '50%',
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    width: Dimensions.get('window').width * 0.4,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});