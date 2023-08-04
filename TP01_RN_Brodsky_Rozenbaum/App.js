import { StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Input from './components/Input.js'

export default function App() {
  const [usuario,setUsuario] = useState({});
  const [pass,setPass] = useState('');

  const handleInputChange = (value, pass="",opcion="") => {
    console.log(value);
    if (opcion === "Usuario") {
      setUsuario(value);  
    }
    if(opcion ==="Pass"){
      setPass(value);
    }
    };
    const submitForm = ()=>{
      // HACER UN ESTADO [USER, SETUSER] Y AGREGARLE EL USUARIO Y PASS.
      // Y DESPUES CONECTARLO CON LA API (DAI-BRODSKY-ROZENBAUM).
    }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Input textoPlaceholder='Ingrese su usuario' opcion={"Usuario"} onChange={handleInputChange}/>
      <Input textoPlaceholder='Ingrese su contraseña' opcion={"Pass"} onChange={handleInputChange}/>
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
    width:'80%',
    maxWidth:150,
    borderRadius: 10,
    backgroundColor:'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
