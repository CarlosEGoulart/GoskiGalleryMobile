import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import ActionIcons from './ActionIcons';
import useCollection from '@/firebase/hooks/useCollection';
import theme from '@/constants/theme';

interface Art {
  id: string;
  title: string;
  artistName: string;
  artistId: string;
  image: string;
  description: string;
  likes?: string[];
}

interface Artist {
  id: string;
  name: string;
  image: string;
}

export default function Arts({ searchQuery }) {
  const { data: artsData, loading: artsLoading } = useCollection<Art>('arts');
  const { data: artistsData, loading: artistsLoading } = useCollection<Artist>('artists');
  const [filteredArts, setFilteredArts] = useState<Art[]>([]);

  useEffect(() => {
    if (artsLoading) {
      setFilteredArts([]);
      return;
    }

    if (searchQuery) {
      const newFilteredArts = artsData.filter(art =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArts(newFilteredArts);
    } else {
      setFilteredArts(artsData);
    }
  }, [searchQuery, artsData, artsLoading]);

  const getArtistImage = (artistId: string) => {
    const artist = artistsData.find(a => a.id === artistId);
    return artist ? artist.image : 'https://via.placeholder.com/40';
  };

  const renderArtItem = ({ item }: { item: Art }) => (
    <View style={styles.artItem}>
      <Link href={{ pathname: "/artists", params: { id: item.artistId } }} asChild>
        <TouchableOpacity style={styles.artistHeader}>
          <Image source={{ uri: getArtistImage(item.artistId) }} style={styles.artistImage} />
          <Text style={styles.artistName}>{item.artistName}</Text>
        </TouchableOpacity>
      </Link>

      <Link href={{ pathname: "/artsCatalog", params: { id: item.id } }} asChild>
        <TouchableOpacity>
          <Image source={{ uri: item.image || 'https://via.placeholder.com/400' }} style={styles.artImage} />
        </TouchableOpacity>
      </Link>

      <View style={styles.artInfo}>
        <View style={styles.artActions}>
          <Text style={styles.artTitle}>{item.title}</Text>
          <ActionIcons art={item} />
        </View>
        <Text style={styles.artDescription}>{item.description}</Text>
      </View>
    </View>
  );

  if (artsLoading || artistsLoading) {
    return <ActivityIndicator size="large" color={theme.colors.light} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <FlatList
        data={filteredArts}
        renderItem={renderArtItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  artTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  artDescription: {
    color: 'white',
    marginTop: 5,
  },
  artActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
