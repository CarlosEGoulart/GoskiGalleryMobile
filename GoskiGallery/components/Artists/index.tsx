import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import StyleText from '../StyleText';
import { Link } from 'expo-router';
import StyleButton from '../StyleButton';

const artistsData = [
  {
    id: '1',
    name: 'carlllos.png',
    image: require('@/assets/images/profilePhotos/carlos.jpg'),
  },
  {
    id: '2',
    name: 'jxliaazy',
    image: require('@/assets/images/profilePhotos/julia.png'),
  },
];

export default function Artists() {
  const renderArtistItem = ({ item }) => (
    <Link href={{ pathname: "/artists", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.artistItem}>
        <View style={styles.artistInfo}>
          <Image source={item.image} style={styles.artistImage} />
          <StyleText style={styles.artistName}>{item.name}</StyleText>
        </View>
        <StyleButton>Seguir</StyleButton>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={artistsData}
        renderItem={renderArtistItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
