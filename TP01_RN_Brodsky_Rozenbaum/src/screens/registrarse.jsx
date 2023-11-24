import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function registrarse() {
  const [message, setMessage] = React.useState('')
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

/*const signUp2 = async () => {

    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = user;
      const db = getFirestore();
      await setDoc(doc(db, "users", uid), {
        nombre,
        telefono,
        email,
        uid,
      });
      setNombre("");
      setTelefono("");
      setEmail("");
      setPassword("");
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "El usuario ha sido creado correctamente.",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ha ocurrido un error al crear el usuario.",
      });
    }

    navigation.navigate('Home', { user });
  };*/
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registrarse</Text>
      <Input label='Email' placeholder='Ingrese su Email' value={user.Email} onChangeText={(text) => setUser({...user, Email:text })} opcion={false} />
      <Input label='Password' placeholder='Ingrese una Contraseña' value={user.Password} onChangeText={(text) => setUser({ ...user, Password: text })} opcion={true} />
       <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Text style={styles.linkText}>¿Ya tienes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Iniciar Sesión</Text></Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: 'center',
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    width: '60%',
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
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
  linkText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});