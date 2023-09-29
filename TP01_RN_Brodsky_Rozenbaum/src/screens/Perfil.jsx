import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function Perfil({ route }) {
  const { user } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState(user); 

  useEffect(() => {
    setUsuario(editedUser);
  }, [editedUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser({
      ...editedUser,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={editedUser.Nombre}
            onChangeText={(text) => handleInputChange('Nombre', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={usuario.Apellido}
            onChangeText={(text) => handleInputChange('Apellido', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={usuario.Usuario}
            onChangeText={(text) => handleInputChange('Usuario', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={usuario.Password}
            onChangeText={(text) => handleInputChange('Password', text)}
            secureTextEntry={!showPassword} 
          />
          <Button title="Guardar" onPress={handleSaveClick} />
        </View>
      ) : (

        <View>
          <Text>Nombre: {usuario.Nombre}</Text>
          <Text>Apellido: {user.Apellido}</Text>
          <Text>Usuario: {user.Usuario}</Text>
          <Text>Contraseña: {showPassword ? user.Password : '••••••••••'}</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleButtonText}>
              {showPassword ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
            </Text>
          </TouchableOpacity>
          <Button title="Editar" onPress={handleEditClick} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  toggleButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
