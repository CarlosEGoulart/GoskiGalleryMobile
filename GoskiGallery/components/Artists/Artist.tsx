import { StyleSheet, View, Image, FlatList } from 'react-native';
import React from 'react';
import StyleText from '../StyleText';
import { useLocalSearchParams } from 'expo-router';

const artistsData = {
  '1': {
    name: 'carlllos.png',
    image: require('@/assets/images/profilePhotos/carlos.jpg'),
    bio: 'Estudante de TSI que rouba desenhos da namorada',
    arts: [
      { id: '1', title: 'Patrick Bateman', image: require('@/assets/images/catalog/Patrick.jpg') },
    ]
  },
  '2': {
    name: 'jxliaazy',
    image: require('@/assets/images/profilePhotos/julia.png'),
    bio: 'Estudante de Artes que é muito boa desenhista, atriz, musica, e tudo q pega pra fazer',
    arts: [
       { id: '2', title: 'Serj Tankian', image: require('@/assets/images/catalog/Serj.jpg') },
    ]
  },
};

export default function ArtistProfile() {
  const { id } = useLocalSearchParams();
  const artist = artistsData[id];

  if (!artist) {
    return (
      <View style={styles.container}>
        <StyleText>Artista não encontrado</StyleText>
      </View>
    );
  }

  const renderArtItem = ({ item }) => (
    <View style={styles.artItem}>
      <Image source={item.image} style={styles.artImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={artist.image} style={styles.profileImage} />
        <StyleText style={styles.artistName}>{artist.name}</StyleText>
        <StyleText style={styles.artistBio}>{artist.bio}</StyleText>
      </View>
      <FlatList
        data={artist.arts}
        renderItem={renderArtItem}
        keyExtractor={item => item.id}
        numColumns={3}
        style={styles.gallery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  artistBio: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
  },
  gallery: {
    flex: 1,
  },
  artItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  artImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    flex: 1,
  },
});
