import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,SafeAreaView } from 'react-native';

const Input = ({ placeholder = "error", value, onChangeText, opcion }) => {
 
    const [text,setTexto] = useState('');

    const actualizarTexto = (text) => {
        //setTexto(text);
        //onChange(text);
        if (opcion) {
           //setTexto(text.replace(/./g, '*'));
           setTexto(text);
          } else {
            setTexto(text);
          }
          onChange(text); // Llama a la función onChange del componente padre
        
    };
    
    
      
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width:'30%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        textAlign:'center',
        margin:4,
        borderWidth: 1.5,
        width: '100%',
        height: 40,
      },
});

export default Input;