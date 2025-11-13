import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { db } from '@/firebase/config/firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';

interface User {
  uid: string;
}

interface Art {
  id: string;
  title: string;
  artistId: string;
  likes?: string[];
}

export default function ActionIcons({ art, user }: { art: Art, user: User | null }) {
  const { currentTheme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(art.likes?.length || 0);
  const isOwner = user ? user.uid === art.artistId : false;

  useEffect(() => {
    if (!art.id) return;

    const artRef = doc(db, 'arts', art.id);
    const unsubscribe = onSnapshot(artRef, (doc) => {
      const data = doc.data();
      const likes = data?.likes || [];
      setLikeCount(likes.length);
      
      if (user?.uid) {
        setIsLiked(likes.includes(user.uid));
      }
    });

    return () => unsubscribe();
  }, [art.id, user?.uid]);

  const handleLike = async () => {
    if (!user?.uid) {
      console.log('Usuário não logado, não pode curtir.');
      return;
    }

    const artRef = doc(db, 'arts', art.id);

    if (isLiked) {
        await updateDoc(artRef, {
        likes: arrayRemove(user.uid)
      });
    } else {
        await updateDoc(artRef, {
        likes: arrayUnion(user.uid)
      });
    }
  };
  const likeColor = isLiked ? currentTheme.primary : currentTheme.text;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
        <AntDesign 
          name='heart'
          size={24} 
          color={likeColor}
        />
        <Text style={[styles.likeCountText, { color: likeColor }]}>
          {likeCount}
        </Text>
      </TouchableOpacity>
      {isOwner && (
        <Link href={{ pathname: "/editArt", params: { id: art.id } }} asChild>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="edit" size={24} color={currentTheme.text} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    likeCountText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: 'bold',
    }
});
