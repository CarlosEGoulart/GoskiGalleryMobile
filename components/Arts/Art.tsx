import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import StyleText from '../StyleText';
import { Link } from '@react-navigation/native';

const artsData = {
  '1': {
    title: 'Patrick Bateman',
    artist: 'carlllos.png',
    artistImage: require('@/assets/images/profilePhotos/carlos.jpg'),
    image: require('@/assets/images/catalog/Patrick.jpg'),
    description: 'Desenho do Patrick Bateman que Carlos roubou de Julia só pra ter 2 perfis no app',
  },
  
  '2': {
    title: 'Serj Tankian',
    artist: 'jxliaazy',
    image: require('@/assets/images/catalog/Serj.jpg'),
    artistImage: require('@/assets/images/profilePhotos/julia.png'),
    description: 'Desenho do Serj Tankian que a Julia fez de fato',
  },
};

export default function Art() {
  const { id } = useLocalSearchParams();
  const art = artsData[id];

  if (!art) {
    return (
      <View style={styles.container}>
        <StyleText>Arte não encontrada</StyleText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href={{ pathname: "/artists", params: { id: art.artistId } }} asChild>  
        <TouchableOpacity style={styles.artistHeader}>
          <Image source={art.artistImage} style={styles.artistImage} />
          <Text style={styles.artistName}>{art.artist}</Text>
        </TouchableOpacity>
      </Link>
      <Image source={art.image} style={styles.artImage} />
      <View style={styles.artInfo}>
        <Text style={styles.artTitle}>{art.title}</Text>
        <Text style={styles.artDescription}>{art.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  artImage: {
    width: '100%',
    height: 400,
  },
  artInfo: {
    padding: 20,
  },
  artTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  artistName: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
  artDescription: {
    fontSize: 16,
    marginTop: 15,
    color: 'white'
  },
  artistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  artistImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
