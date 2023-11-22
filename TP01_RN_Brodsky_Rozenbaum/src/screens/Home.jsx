import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDocs, query, where, collection } from "firebase/firestore";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
//import Carousel from 'react-native-snap-carousel';


export default function Home({ route, navigation }) {
  const { user2 } = route.params;
  const [user, setUser] = useState({
    mail: null,
    password: null,
  });

  useEffect(() => {
    const storedMail = localStorage.getItem('mail');
    const storedPass = localStorage.getItem('pass');
    console.log(storedMail);
    console.log(storedPass);
    setUser({ mail: storedMail, password: storedPass });

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

  /*const _renderItem = ({ item, index }) => {

    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
    /*
    return (
        <View style={styles.carouselItem}>
          <Text>{item.title}</Text>
          <Image style={styles.stretch} source={item.image} />
          <Image
          source={require('../../assets/favicon.png')}
        />
        </View>
      );
  };*/
  /*<Carousel LINEA 68 REMPLAZANDO LA IMG!
            layout="default"
            data={carouselItems}
            renderItem={_renderItem}
            sliderWidth={300}
            itemWidth={300}
          />*/
  const verDetalle = (id) => {
    // Logica para verDetalle
    console.log(id);
  }
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
      </View>
      <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={() => verDetalle(1)} >
          <Image style={styles.stretch} source={require('../../assets/favicon.png')} />
        </TouchableOpacity>
        <Text style={styles.descripcionCarta}>descripcion de la imagen </Text>

      </View>
      <View style={styles.bodyContainer}><Text>div abajo</Text></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: '2px',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: '2px',
    width: '100%',
  },
  navbar: {
    width: '100%',
    height: '10vh',
    borderWidth: '2px',
    borderColor: 'green',
  },
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  descripcionCarta: {
    textAlign:'center',
    width: '100%',
    height:'30%',
    borderWidth: '2px',
    borderColor: 'grey',
    overflow:'scroll'
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
