import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,SafeAreaView } from 'react-native';

const Input = ({textoPlaceholder ="por fin", opcion,onChange}) => {
    const [text,setTexto] = useState('');

    const ocultarPass = (text) => {
        setTexto(text);
        onChange(text); 
    }
    
    
      
    return(
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={text}
            placeholder={textoPlaceholder}
            onChangeText={ocultarPass}
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