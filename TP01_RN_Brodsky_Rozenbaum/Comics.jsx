import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import axios from 'axios';
import NavBar from '../components/navBar.jsx'
import { confirmPasswordReset } from 'firebase/auth';
import Personajes from './Personajes.jsx';
import { useNavigation } from '@react-navigation/native'; 

export default function Comics({ route }) {
  const navigation = useNavigation();
  const [selectedComic, setSelectedComic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    mail: null,
    password: null,
  });
  const [personajes, setPersonajes] = useState([]);
 
  // api Marvel
  useEffect(() => {
    axios.get('http://gateway.marvel.com/v1/public/comics?ts=1&apikey=0f34133c1783016d6d25e28f6e704f10&hash=013f4ebfd13ba730cf1ba5f735a4bb88')
      .then((res) => {
        setPersonajes(res.data.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const verDetalle = (comic) => {
    setSelectedComic(comic);
    console.log(comic);
    localStorage.setItem('comicSelected', comic.id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => { verDetalle(item) }}>
      <Image style={styles.cardImage} source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
      <Text style={styles.cardDescription}>{item.title}</Text>
    </TouchableOpacity>
  );
  const mostrarPersonajes = (comic)=>{
    setModalVisible(false);
    navigation.navigate('Personajes')
  }

  return (
    <View style={styles.container}>
      <NavBar />
      
      <View style={styles.body}>
        <Text style={{ color: 'white', fontSize: '100%', textAlign: 'center', fontFamily: 'bold' }}>
          Clickea una imagen para ver más detalles
        </Text>
        {/* Sección de cartas */}
        <FlatList
          data={personajes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        {/* Modal para mostrar detalles */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            {/* Detalles del cómic */}
            {selectedComic && (
              <View style={{width:'100%' ,display:'flex ', alignItems:'center'}}>
                <Text style={styles.modalTitleText}>{selectedComic.title}</Text>
            
                  <TouchableOpacity
                    style={styles.viewDetailsButton}
                    onPress={(item) => mostrarPersonajes()}
                  >
                    <Text style={styles.buttonText}>Mostrar Personajes</Text>
                  </TouchableOpacity>
            
              </View>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    borderWidth: '2px',
    borderColor: 'white',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  cardImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  cardDescription: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  arenaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  arenaText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    alignItems: 'flex-end',
    margin: 10,
    height: '40%',
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  closeButton: {
    margin: 10,
    textAlign: 'right',
    alignSelf: 'flex-start',
    fontSize: 20,
  },
  modalTitleText: {
    margin: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBodyText: {

  },
  viewDetailsButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
