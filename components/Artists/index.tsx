import { StyleSheet, View, FlatList, Image, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import StyleButton from '../StyleButton';
import useCollection from '@/firebase/hooks/useCollection';
import theme from '@/constants/theme';

interface Artist {
  id: string;
  name: string;
  image: string;
}

export default function Artists() {
  const { data: artistsData, loading } = useCollection<Artist>('artists');

  const renderArtistItem = ({ item }: { item: Artist }) => (
    <Link href={{ pathname: "/artists", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.artistItem}>
        <View style={styles.artistInfo}>
          <Image source={{ uri: item.image || 'https://via.placeholder.com/50' }} style={styles.artistImage} />
          <Text style={styles.artistName}>{item.name}</Text>
        </View>
        <StyleButton>Seguir</StyleButton>
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return <ActivityIndicator size="large" color={theme.colors.light} />;
  }

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
    backgroundColor: theme.backgroundColor,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    color: theme.colors.light,
  },
});
