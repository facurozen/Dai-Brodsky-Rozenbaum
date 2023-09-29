import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({ route, navigation }) {
  const { user } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido {user.Nombre} {user.Apellido}</Text>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Perfil', { user })}
      />
    </View>
  );
}
