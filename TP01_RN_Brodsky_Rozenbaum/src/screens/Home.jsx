import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function Home({ route }) {

    const { user } = route.params;
    useEffect(()=>{
        console.log(user);
    })
    return (
      <View>
        <Text>Bienvenido {user.Nombre} {user.Apellido}</Text>
      </View>
    );
    }    
