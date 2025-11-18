import { useTheme } from "@/context/ThemeContext";
import usePocketBaseCollection from "@/pocketbaseFiles/hooks/usePocketBaseCollection";
import usePocketBaseDocument from "@/pocketbaseFiles/hooks/usePocketBaseDocument";
import { usePocketBaseStore } from "@/pocketbaseFiles/stores/usePocketBaseStore";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
}

interface Art {
  id: string;
  image: string;
  artist: string; // Artist ID
}

export default function ArtistProfile() {
  const { id } = useLocalSearchParams();
  const { pocketBase: pb } = usePocketBaseStore();
  const { data: artist, loading: artistLoading } = usePocketBaseDocument<Artist>(
    "users",
    id as string
  );
  const { data: artsData, loading: artsLoading } = usePocketBaseCollection<Art>("arts");
  const { currentTheme } = useTheme();

  const artistArts = useMemo(() => {
    if (artsData && id) {
      return artsData.filter((art) => art.artist === id);
    }
    return [];
  }, [artsData, id]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
    },
    profileHeader: {
      alignItems: "center",
      padding: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    artistName: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 10,
      color: currentTheme.text,
    },
    artistBio: {
      fontSize: 16,
      color: currentTheme.subtleText,
      marginTop: 10,
      textAlign: "center",
    },
    gallery: {
      flex: 1,
    },
    artItem: {
      flex: 1,
      flexDirection: "column",
      margin: 1,
    },
    artImage: {
      justifyContent: "center",
      alignItems: "center",
      height: 300,
      flex: 1,
    },
  });

  if (artistLoading || artsLoading) {
    return <ActivityIndicator size="large" color={currentTheme.primary} />;
  }

  if (!artist) {
    return (
      <View style={styles.container}>
        <Text style={{ color: currentTheme.text }}>Artista não encontrado</Text>
      </View>
    );
  }

  const renderArtItem = ({ item }: { item: Art }) => (
    <View style={styles.artItem}>
      <Image
        source={{ uri: pb.files.getUrl(item, item.image) }}
        style={styles.artImage}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: artist.image ? pb.files.getUrl(artist, artist.image) : "https://via.placeholder.com/100",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistBio}>{artist.bio}</Text>
      </View>
      <FlatList
        data={artistArts}
        renderItem={renderArtItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.gallery}
      />
    </View>
  );
}
