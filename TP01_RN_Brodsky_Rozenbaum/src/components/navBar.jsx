import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import('./lib/reanimated2/globals');
import { useNavigation } from '@react-navigation/native'; 


const navBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Marvel Info</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.arenaContainer} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arenaContainer} onPress={() => navigation.navigate('Comics')}>
          <Text style={styles.buttonText}>Go Comics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arenaContainer} onPress={() => navigation.navigate('Personajes')}>
          <Text style={styles.buttonText}>Go Character</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100vw',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonText: {
    color: '#3498db',
    margin: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  arenaContainer: {
    width:'30vw',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default navBar;