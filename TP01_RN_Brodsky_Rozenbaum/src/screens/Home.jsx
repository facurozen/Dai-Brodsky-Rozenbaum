import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDocs, query, where, collection } from "firebase/firestore";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import axios from 'axios';


export default function Home({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    mail: null,
    password: null,
  });
  const [cartas, setCartas] = useState([]);

  useEffect(() => {
    const storedMail = localStorage.getItem('mail');
    const storedPass = localStorage.getItem('pass');
    setUser({ mail: storedMail, password: storedPass });
  }, []);

  /*
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   
  
  */

  useEffect(() => {
    //let accessCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImJiYjBlYjI3LTdkZTctNGM3MC05OWRmLTY4MzZkZDBhYzY5NyIsImlhdCI6MTcwMTA5Mzk5NSwic3ViIjoiZGV2ZWxvcGVyLzI1NDkxNWM1LWNhNmMtMWVlOC01Yzc2LWE5Yjc4ZDQxNGI4ZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxODEuMTY4LjE5Ny40Il0sInR5cGUiOiJjbGllbnQifV19.-ntF0uSyawyzUtfcWkIQorjgyCha3hUi_KreMk_89kVPtHSxtI_NjyNfYLrQMAoEcG6OuTgY_3VxdJWNEgZ-Bg';
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
      'Access-Control-Allow-Origin': '*'
    };
    let url = 'https://api.clashroyale.com/v1/cards';
    axios.get(url, { 'headers': headers })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud: ', error)
      })
  }, []);

  const carouselItems = [
    {
      title: 'Item 1',
      image: require('../../assets/adaptive-icon.png'), // Reemplaza con la ruta correcta de tu imagen
    },
    {
      title: 'Item 2',
      image: require('../../assets/favicon.png'), // Reemplaza con la ruta correcta de tu imagen
    },
    // Agrega más objetos según sea necesario
  ];

  const verDetalle = (jeje) => {
    setModalVisible(jeje);
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => setModalVisible(true)}>
      <Image style={styles.cardImage} source={item.image} />
      <Text style={styles.cardDescription}>{item.title}</Text>
    </TouchableOpacity>
  );
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado de la aplicación */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Clash Royale Info</Text>
      </View>

      {/* Cuerpo de la aplicación */}
      <View style={styles.body}>
        {/* Sección de carta */}

        <TouchableOpacity style={styles.cardContainer} onPress={() => verDetalle(true)}>
          <Image style={styles.cardImage} source={'https://api-assets.clashroyale.com/cards/300/X_DQUye_OaS3QN6VC9CPw05Fit7wvSm3XegXIXKP--0.png'} />
          <Text style={styles.cardDescription}>Descripción de la carta</Text>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={{ alignItems: 'end', margin: '10vw', height: '40vh', borderWidth: '2px', backgroundColor: 'white', borderRadius: '1%' }}>
              <TouchableOpacity onPress={() => verDetalle(false)}>
                <Text style={{ margin: '10px', textAlign: 'right', alignSelf: 'flex-start' }}>X</Text>
              </TouchableOpacity>
              <Text style={{ margin: '10px', alignSelf: 'center', fontSize: '20px', fontWeight: 'bold' }}>Informacion sobre la carta</Text>

            </View>
          </Modal>
        </TouchableOpacity>

        {/* Sección de arena */}
        <View style={styles.arenaContainer}>
          <Text style={styles.arenaText}>Información de la Arena</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  cardDescription: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
  arenaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  arenaText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


/*
------------------------------------------------------------------------ !CODIGO VIEJO! ---------------------------------------------------------------------------------
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
});*/
