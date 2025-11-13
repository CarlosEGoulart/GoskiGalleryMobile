import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import ActionIcons from './ActionIcons';
import usePocketBaseCollection from '@/pocketbase/hooks/usePocketBaseCollection';
import { usePocketBaseStore } from '@/pocketbase/stores/usePocketBaseStore';
import { useTheme } from '@/context/ThemeContext';
import Loading from '../Loading';

interface Art {
  id: string;
  title: string;
  artistName: string;
  artist: string; // This is the artist ID
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
  const { data: artsData, loading: artsLoading } = usePocketBaseCollection<Art>('arts');
  const { data: artistsData, loading: artistsLoading } = usePocketBaseCollection<Artist>('users');
  const { user, pocketBase: pb } = usePocketBaseStore();
  const { currentTheme } = useTheme();
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
    return artist && artist.image ? pb.files.getUrl(artist, artist.image) : 'https://via.placeholder.com/40';
  };

  const renderArtItem = ({ item }: { item: Art }) => (
    <View style={[styles.artItem, { backgroundColor: currentTheme.card }]}>
        <Link href={{ pathname: "/artists", params: { id: item.artist } }} asChild>
        <TouchableOpacity style={styles.artistHeader}>
          <Image source={{ uri: getArtistImage(item.artist) }} style={styles.artistImage} />
          <Text style={[styles.artistName, { color: currentTheme.text }]}>{item.artistName}</Text>
        </TouchableOpacity>
      </Link>

      <Link href={{ pathname: "/artsCatalog", params: { id: item.id } }} asChild>
        <TouchableOpacity>
          <Image source={{ uri: item.image ? pb.files.getUrl(item, item.image) : 'https://via.placeholder.com/400' }} style={styles.artImage} />
        </TouchableOpacity>
      </Link>

      <View style={styles.artInfo}>
        <View style={styles.artActions}>
          <Text style={[styles.artTitle, { color: currentTheme.text }]}>{item.title}</Text>
          <ActionIcons art={item} user={user} />
        </View>
        <Text style={[styles.artDescription, { color: currentTheme.subtleText }]}>{item.description}</Text>
      </View>
    </View>
  );

  if (artsLoading || artistsLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
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
    },
    artDescription: {
        marginTop: 5,
    },
    artActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
