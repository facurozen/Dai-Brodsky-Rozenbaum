// Personajes.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import NavBar from '../components/navBar.jsx';
export default function Personajes({ route }) {
    const [characterId, setCharacterId] = useState(null);
    const [personajes, setPersonajes] = useState([]);
    const idComic = localStorage.getItem('comicSelected');

    useEffect(() => {
        console.log(idComic);
        // llamo a la API de Marvel para obtener los personajes de cada cómic
        axios.get(`http://gateway.marvel.com/v1/public/comics/${idComic}/characters?ts=1&apikey=0f34133c1783016d6d25e28f6e704f10&hash=013f4ebfd13ba730cf1ba5f735a4bb88`)
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
            <NavBar navigation={navigation} />
            <Text style={styles.headerText}>Personajes del Cómic</Text>
            <FlatList
                data={personajes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // cantidad de columnas
            />
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
});
