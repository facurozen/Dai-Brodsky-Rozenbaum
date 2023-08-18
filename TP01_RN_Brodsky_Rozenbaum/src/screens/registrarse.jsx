import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Link } from '@react-navigation/native'
import Input from '../components/Input'
import React from 'react'

export default function registrarse() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')

  const signUp = () => {
    const user = {
      username: username,
      pass: password
    }
    console.log(username, password)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    }
    fetch('http://localhost:5000/register', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.message === 'user created') setMessage('Usuario creado')
        else setMessage('El usuario ya existe')
      })
  }

  return (
      <View>
        <Text style={styles.text}>Sign Up</Text>
        <Input label='Username' placeholder='Ingrese un Nombre de Usuario' setUsername={setUsername} secureTextEntry={false} />
        <Input label='Password' placeholder='Ingrese una Contraseña' setPassword={setPassword} secureTextEntry={true} />
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