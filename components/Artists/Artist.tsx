import { StyleSheet, View, Image, FlatList, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import StyleText from '../StyleText';
import { useLocalSearchParams } from 'expo-router';
import useDocument from '@/firebase/hooks/useDocument';
import theme from '@/constants/theme';

interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  arts?: any[];
}

export default function ArtistProfile() {
  const { id } = useLocalSearchParams();
  const { data: artist, loading } = useDocument<Artist>('artists', id as string);

  if (loading) {
    return <ActivityIndicator size="large" color={theme.colors.light} />;
  }

  if (!artist) {
    return (
      <View style={styles.container}>
        <StyleText>Artista não encontrado</StyleText>
      </View>
    );
  }

  const renderArtItem = ({ item }) => (
    <View style={styles.artItem}>
      <Image source={{ uri: item.image }} style={styles.artImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: artist.image || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistBio}>{artist.bio}</Text>
      </View>
      <FlatList
        data={artist.arts || []}
        renderItem={renderArtItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.gallery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
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
    color: theme.colors.light,
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
