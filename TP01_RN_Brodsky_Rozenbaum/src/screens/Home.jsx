import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDocs, query, where, collection } from "firebase/firestore";
import { useSafeAreaFrame } from 'react-native-safe-area-context';

export default function Home({ route, navigation }) {
  const { user2 } = route.params;
  const [user,setUser] = useState({
    mail:null,
    password:null,
  });

  useEffect(() => {
    // Obtener el ID del usuario desde localStorage
    const storedMail = localStorage.getItem('mail');
    const storedPass = localStorage.getItem('pass');
    
      setUser({ mail: storedMail, password: storedPass });

  }, []);

  
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>sambalanga</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text>Bienvenido {user2.email} lo quiero mucho!</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Perfil', { user:user })}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
