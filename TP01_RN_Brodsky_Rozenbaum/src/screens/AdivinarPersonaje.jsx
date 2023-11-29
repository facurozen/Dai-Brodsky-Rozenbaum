import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import NavBar from '../components/navBar.jsx'

export default function AdivinarPersonaje({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({ mail: null, password: null, });
    let textoPuntaje = `Puntaje: 
respusta correcta: +10 
respuesta incorrecta: -5
respuesta salteada: -3`;

    useEffect(() => {
        const storedMail = localStorage.getItem('mail');
        setUser({ mail: storedMail });
    }, []);

    // logica del juego!!
    const [puntaje, setPuntaje] = useState(0);
    const [random, setRandom] = useState({});
    const [personajes, setPersonajes] = useState([]);
    const [imagen, setImagen] = useState([]);
    const [tiempo, setTiempo] = useState(15);
    const [ref, setRef] = useState();
    const [respuesta, setRespuesta] = useState();

    useEffect(() => {
        if (tiempo > 0) {
            setRef(setTimeout(() => {
                setTiempo(t => t - 1);
            }, 1000));
        } else {
            console.log("no hay mas tiempo zapallo");
        }
    }, [tiempo])

    useEffect(() => { // en este useEffect me gustaria cargar todos los personaje para hacer el juego!
        axios.get('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0f34133c1783016d6d25e28f6e704f10&hash=013f4ebfd13ba730cf1ba5f735a4bb88')
            .then((res) => {
                setPersonajes(res.data.data.results);
                const randomElement = res.data.data.results[Math.floor(Math.random() * res.data.data.results.length)];
                setRandom(randomElement);
                console.log(randomElement);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);
    useEffect(() => {
        /*while (random.thumbnail  === null) {
            (random.thumbnail) ? setImagen(`${random.thumbnail.path}.${random.thumbnail.extension}`) : null;
            console.log(2)
        }*/
    }, [random]);


    const verificarRespuesta = (e) => {
        console.log(respuesta);
        const tiempoRespuesta = tiempo;
        console.log(tiempoRespuesta);
        // ACTUALIZAR PUNTAJE
        if (respuesta.name === random.name) {
            setPuntaje(puntaje + 10 + tiempo);
        }
        else {
            setPuntaje(puntaje - 1)
        }
        console.log(random.name);
        // NUEVA BANDERA
        const randomElement = personajes[Math.floor(Math.random() * 220)];
        setRandom(randomElement);
        setRespuesta('');
        clearTimeout(ref);
        setTiempo(15);
    }

    return (
        <View style={styles.container}>
            <NavBar />
            <View style={{ display: 'flex', margin: '20px' }}>
                <Text style={{ color: 'white', fontSize: '25px', textAlign: 'center' }}>Bienvenido {user.mail}</Text>
                <Text style={{ marginTop: '10px', color: 'white', fontSize: '15px', textAlign: 'center' }}>Cuando usted apriete comenzar. El tiempo arrancara y en 30 segundos para adivinar la mayor cantidad de personajes</Text>
                <Text style={{ marginTop: '25px', color: 'white', fontSize: '18px', textAlign: 'left' }}>{textoPuntaje}</Text>
            </View>
            <View style={styles.formContainer}>
                {(random.thumbnail) ? (
                    <Image
                        source={{ uri: `${random.thumbnail.path}.${random.thumbnail.extension}` }}
                        style={styles.imagenGame}
                    />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>Cargando...</Text>
                    </View>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Adivina el personaje"
                    name="respuesta"
                    onChangeText={(text) => setRespuesta(text)}
                />
                <TouchableOpacity style={styles.button} onPress={verificarRespuesta}>
                    <Text style={{ color: 'white' }}>Enviar</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.infoText}>Puntaje: {puntaje} Tiempo: {tiempo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    imagenGame: {
        width: '90vw',
        height: '40vh',
        borderWidth: '2px',
        borderColor: 'white',
    },
    button: {
        height: '5vh',
        width: '20vw',
        borderWidth: '5px',
        borderColor: 'white',
        borderRadius: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        margin: '10px',
        height: '5vh',
        width: '80vw',
        borderWidth: '5px',
        borderColor: 'white',
        borderRadius: '1%',
        padding: '10px',
        color: 'white',
    }
});
