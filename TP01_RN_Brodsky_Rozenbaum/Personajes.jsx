// Personajes.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NavBar from '../components/navBar.jsx';
import { useNavigation } from '@react-navigation/native';

export default function Personajes({ route }) {
    const [characterId, setCharacterId] = useState(null);
    const [personajes, setPersonajes] = useState([]);
    let idComic = localStorage.getItem('comicSelected');
    const navigation = useNavigation();
    useEffect(() => {
        console.log(idComic);

        let url = 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0f34133c1783016d6d25e28f6e704f10&hash=013f4ebfd13ba730cf1ba5f735a4bb88';
        if (idComic != null) {
            url = `http://gateway.marvel.com/v1/public/comics/${idComic}/characters?ts=1&apikey=0f34133c1783016d6d25e28f6e704f10&hash=013f4ebfd13ba730cf1ba5f735a4bb88`;
        }
        console.log(url);
        axios.get(url)
            .then((res) => {
                setPersonajes(res.data.data.results);
                console.log(res.data.data.results)
            })
            .catch((error) => {
                console.error(error);
            });

    }, [idComic]);

    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <Image style={styles.cardImage} source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
            <Text style={styles.cardDescription}>{item.name}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <NavBar />
            {personajes.length ? (
                <>
                    <Text style={styles.headerText}>Personajes del Cómic</Text>
                    <View style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: idComic ? 'green' : 'red',
                                display: 'flex',
                                alignItems: 'center',
                                width: '50vw',
                                borderRadius: '5%',
                            }}
                            onPress={() => {
                                console.log(idComic);
                                localStorage.removeItem('comicSelected');
                                // No es necesario asignar nuevamente a idComic después de eliminarlo del localStorage
                                console.log("¡Removido!");
                            }}
                        >
                            <Text style={{ color: 'white' }}>Eliminar Álbum seleccionado</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={personajes}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2} // cantidad de columnas
                    />
                </>
            ) : (
                <View style={{display:'flex', alignItems:'center'}}>
                    <Text style={styles.textoError}>No hay personajes disponibles</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: idComic ? 'green' : 'red',
                            display: 'flex',
                            alignItems: 'center',
                            width: '50vw',
                            margin:'20px',
                            borderRadius: '5%',
                        }}
                        onPress={() => {
                            console.log(idComic);
                            localStorage.removeItem('comicSelected');
                            // No es necesario asignar nuevamente a idComic después de eliminarlo del localStorage
                            console.log("¡Removido!");
                        }}
                    >
                        <Text style={{ color: 'white' }}>Eliminar Álbum seleccionado</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardContainer: {
        backgroundColor: '#fff',
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
        color: '#333',
        fontSize: 16,
    },
    textoError: {
        textAlign: 'center',
        fontSize: '34px',
        color: 'white'
    }

});
