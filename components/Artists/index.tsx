import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import StyleButton from '../StyleButton';
import usePocketBaseCollection from '@/pocketbase/hooks/usePocketBaseCollection';
import { useTheme } from '@/context/ThemeContext';
import Loading from '../Loading';
import { usePocketBaseStore } from '@/pocketbase/stores/usePocketBaseStore';

interface Artist {
  id: string;
  name: string;
  image: string;
}

export default function Artists() {
  const { data: artistsData, loading } = usePocketBaseCollection<Artist>('users');
  const { currentTheme } = useTheme();
  const { pocketBase: pb } = usePocketBaseStore();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: currentTheme.background,
    },
    artistItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.subtleText,
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
      color: currentTheme.text,
    },
  });

  const renderArtistItem = ({ item }: { item: Artist }) => (
    <Link href={{ pathname: "/artists", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.artistItem}>
        <View style={styles.artistInfo}>
          <Image 
            source={{ uri: item.image ? pb.files.getUrl(item, item.image) : 'https://via.placeholder.com/50' }} 
            style={styles.artistImage} 
          />
          <Text style={styles.artistName}>{item.name}</Text>
        </View>
        <StyleButton>Seguir</StyleButton>
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return <Loading />;
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
