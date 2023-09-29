import React from 'react';
import { StyleSheet, TextInput, View,Dimensions } from 'react-native';


const Input = ({ placeholder = 'error', value, onChangeText, opcion }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={opcion} // Para ocultar texto si es una contraseña
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%', // Cambiado el ancho al 80% para centrar los TextInput
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Añadido el borderRadius
    marginBottom: 10, // Añadido margen inferior para separar los TextInput
    marginHorizontal:Dimensions.get('window').height/2,
  },
  input: {
    textAlign: 'center',
    borderWidth: 1.5,
    width: '100%',
    height: 40,
  },
});

export default Input;
