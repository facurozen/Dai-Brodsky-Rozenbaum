import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import axios from 'axios';
import NavBar from '../components/navBar.jsx'

export default function Home({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    mail: null,
    password: null,
  });
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const storedMail = localStorage.getItem('mail');
    const storedPass = localStorage.getItem('pass');
    setUser({ mail: storedMail, password: storedPass });
  }, []);

  // api Marvel
  /*useEffect(() => {
    axios.get('http://gateway.marvel.com/v1/public/comics?ts=1&apikey=0f34133c1783016d6d25e28f6e704f10&hash=013f4ebfd13ba730cf1ba5f735a4bb88')
      .then((res) => {
        setPersonajes(res.data.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);*/

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <View style={styles.introContainer}>
        <Text style={styles.introText}>
          ¡Bienvenido a Marvel Explorer!
        </Text>
        <Text style={styles.descriptionText}>
          Explora el emocionante universo de Marvel a través de una extensa colección de cómics y descubre a tus personajes favoritos.
        </Text>
      </View>
      {/* Puedes agregar aquí más secciones o características de tu aplicación */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  introContainer: {
    padding: 20,
    alignItems: 'center',
  },
  introText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
