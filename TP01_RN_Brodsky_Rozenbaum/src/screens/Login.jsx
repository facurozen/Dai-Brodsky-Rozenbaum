import { StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity,Dimensions } from 'react-native';
import Input from '../components/Input.js'
import axios from 'axios';
import cors from 'cors';

export default function Login() {
  const [usuario,setUsuario] = useState('');
  const [password,setPass] = useState('');

  /*const handleInputChange = (value,opcion="") => {
    console.log(value);
    if (opcion === "Usuario") {
      setUsuario(value);  
    }
    if(opcion ==="Pass"){
      setPass(value);
    }
    };*/
    const submitForm = () => {
      const obj = {
        Usuario: usuario,
        Password: password
      }
      console.log(obj);
      axios.post('http://localhost:5000/login', obj ,{
      })
      .then((res) => {
          console.log(res.data.message);
          // Aquí puedes manejar la respuesta del servidor
      })
  };
  return (
    <View style={styles.container}>


      <Input label='Username' placeholder='Ingrese su usuario' value={usuario} onChangeText={setUsuario} opcion={false}/>
      <Input label='Password' placeholder='Ingrese su contraseña' value={password} onChangeText={setPass} opcion={true}/>
      <TouchableOpacity 
      style={styles.button}
      onPress={submitForm}
      
      > 
      <Text style={styles.buttonText}>Ahora si faculindo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width:Dimensions.get("window").width*0.2,
    height:Dimensions.get("window").height*0.06,
    borderRadius: 10,
    backgroundColor:'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
