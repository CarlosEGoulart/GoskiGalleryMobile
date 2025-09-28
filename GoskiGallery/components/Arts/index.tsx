import { StyleSheet, View, Image, FlatList } from 'react-native';
import React from 'react';
import Typography from '../StyleText';
import StyleText from '../StyleText';

const ARTS = [
  { id: '1', image: require('../../assets/images/catalog/Serj.jpg') },
  { id: '2', image: require('../../assets/images/catalog/Patrick.jpg') },
];

const ARTIST = [
  { id: '1', name: 'Jxliaazy' },
  { id: '2', name: 'carlllos.png' },
]

const ArtItem = ({ image }) => (
  <View style={styles.artItem}>
    <Image
      source={image} 
      style={styles.artImage}
    />

    <StyleText></StyleText>

  </View>
);

const ArtSection = ({ title, data }) => (
  <View style={styles.sectionContainer}>
    <Typography style={styles.sectionTitle}>{title}</Typography>
    <FlatList
      data={data}
      renderItem={({ item }) => <ArtItem image={item.image} />}
      keyExtractor={item => item.id}
    />
  </View>
);

export default function Arts() {
  return (
      <View style={styles.container}>
        <ArtSection title="Arts" data={ARTS} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 16,
  },
  sectionContainer: {
    width: '100%',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  artItem: {
    padding: 10,
    alignItems: 'center',
  },
  artImage: {
    width: 350,
    height: 250,
    backgroundColor: '#ccc', 
    borderRadius: 8,
  },
});
