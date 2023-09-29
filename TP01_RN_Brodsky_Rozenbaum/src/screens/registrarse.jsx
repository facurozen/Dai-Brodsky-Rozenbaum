import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import axios from 'axios';

export default function registrarse() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name,setName] = React.useState('')
  const [apellido,setApellido] = React.useState('')
  const [message, setMessage] = React.useState('')
  const navigation = useNavigation();
  const [user, setUser] = useState({
    Usuario: '',
    Password: '',
    Nombre: '',
    Apellido: ''
  });
  const signUp = () => {
  
    axios.post('http://localhost:5000/register', user,{
    })

      .then((res) => {
       console.log('Usuario registrado exitosamente');
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });

      
      navigation.navigate('Home', { user });


  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registrarse</Text>
      <Input label='Username' placeholder='Ingrese un Nombre de Usuario' value={user.Usuario} onChangeText={(text) => setUser({ ...user, Usuario: text })} opcion={false} />
      <Input label='Password' placeholder='Ingrese una Contraseña' value={user.Password} onChangeText={(text) => setUser({ ...user, Password: text })} opcion={true} />
      <Input label='Nombre' placeholder='Ingrese su Nombre' value={user.Nombre} onChangeText={(text) => setUser({ ...user, Nombre: text })} opcion={false} />
      <Input label='Apellido' placeholder='Ingrese su Apellido' value={user.Apellido} onChangeText={(text) => setUser({ ...user, Apellido: text })} opcion={false} />

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