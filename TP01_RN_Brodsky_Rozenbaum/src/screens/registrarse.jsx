import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Link } from '@react-navigation/native'
import Input from '../components/Input'
import React from 'react'
import axios from 'axios';
import cors from 'cors';
import { useNavigation } from '@react-navigation/native';

export default function registrarse() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name,setName] = React.useState('')
  const [apellido,setApellido] = React.useState('')
  const [message, setMessage] = React.useState('')
  const navigation = useNavigation();

  const signUp = () => {
    const [user, setUser] = React.useState({
      Usuario: username,
      Password: password,
      Nombre: name,
      Apellido: apellido
    });
   /* axios
      .post('http://localhost:5000/register', user)
      .then((res) => {
        console.log('Usuario registrado exitosamente');
        // Navega a la pantalla "Perfil" con el nombre de usuario como parámetro
        
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });*/

      navigation.navigate('Perfil', { user, setUser });


  };
  

  return (
      <View>
        <Text style={styles.text}>Register</Text>
        <Input label='Username' placeholder="Ingrese un Nombre de Usuario" value={username} onChangeText={setUsername} opcion={false} />
        <Input label='Password' placeholder='Ingrese una Contraseña' value={password} onChangeText={setPassword} opcion={true} />
        <Input label='Nombre' placeholder='Ingrese su Nombre' value={name} onChangeText={setName} opcion={false} />
        <Input label='Apellido' placeholder='Ingrese su Apellido' value={apellido} onChangeText={setApellido} opcion={false} />


        <TouchableOpacity style={styles.boton} onPress={signUp}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={{padding:10}}>Already have an account? <Link style={styles.link} to={{ screen: 'Login'}}>Login</Link></Text>
        <Text style={styles.message}>{message}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  text: {
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  boton: {
    backgroundColor: "blue",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
  },
  message: {
    padding: 10,
    fontSize: 18,
    color: 'black'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
})