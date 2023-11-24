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
    width: '80%', // Ancho del contenedor al 80% de la pantalla
    backgroundColor: '#fff',
    borderRadius: 10, // Bordes redondeados
    marginBottom: 20, // Margen inferior para separar los TextInput
    paddingHorizontal: 10, // Padding horizontal para separación del borde
  },
  input: {
    textAlign: 'center',
    borderWidth: 1.5,
    borderRadius: 8, // Bordes redondeados del TextInput
    height: 40,
  },
});
export default Input;
