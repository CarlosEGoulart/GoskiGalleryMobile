import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import ActionIcons from './ActionIcons';

const artsData = [
  {
    id: '1',
    title: 'Patrick Bateman',
    artist: 'carlllos.png',
    artistId: '1',
    artistImage: require('@/assets/images/profilePhotos/carlos.jpg'),
    artImage: require('@/assets/images/catalog/Patrick.jpg'),
    description: 'Desenho do Patrick Bateman que Carlos roubou de Julia só pra ter 2 perfis no app',
  },
  {
    id: '2',
    title: 'Serj Tankian',
    artist: 'jxliaazy',
    artistId: '2',
    artistImage: require('@/assets/images/profilePhotos/julia.png'),
    artImage: require('@/assets/images/catalog/Serj.jpg'),
    description: 'Desenho do Serj Tankian que a Julia fez de fato',
  },
];

export default function Arts() {
  const renderArtItem = ({ item }) => (
    <View style={styles.artItem}>
      <Link href={{ pathname: "/artists", params: { id: item.artistId } }} asChild>
        <TouchableOpacity style={styles.artistHeader}>
          <Image source={item.artistImage} style={styles.artistImage} />
          <Text style={styles.artistName}>{item.artist}</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href={{ pathname: "/artsCatalog", params: { id: item.id } }} asChild>
        <TouchableOpacity>
          <Image source={item.artImage} style={styles.artImage} />
        </TouchableOpacity>
      </Link>

      <View style={styles.artInfo}>
        <View style={styles.artActions}>
          <Text style={styles.artTitle}>{item.title}</Text>
          <ActionIcons />
        </View>
        <Text style={styles.artInfo}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={artsData}
        renderItem={renderArtItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artItem: {
    marginVertical: 15,
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
  artistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  artImage: {
    width: '100%',
    height: 400,
  },
  artInfo: {
    padding: 10,
    color: 'white',
  },
  artTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  artActions:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
