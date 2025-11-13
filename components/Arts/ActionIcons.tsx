import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';
import { usePocketBaseStore } from '@/pocketbase/stores/usePocketBaseStore';
import { Record } from 'pocketbase';

interface User extends Record {
  id: string;
}

interface Art extends Record {
  id: string;
  title: string;
  artist: string; // Artist ID
  likes?: string[];
}

export default function ActionIcons({ art, user }: { art: Art, user: User | null }) {
  const { currentTheme } = useTheme();
  const { pocketBase: pb } = usePocketBaseStore();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(art.likes?.length || 0);
  
  const isOwner = user ? user.id === art.artist : false;

  useEffect(() => {
    if (art.likes && user) {
      setIsLiked(art.likes.includes(user.id));
    }
    setLikeCount(art.likes?.length || 0);
  }, [art, user]);

  const handleLike = async () => {
    if (!user?.id) {
      console.log('User not logged in, cannot like.');
      return;
    }

    // Optimistic update
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    try {
      const currentLikes = art.likes || [];
      const newLikes = newIsLiked
        ? [...currentLikes, user.id]
        : currentLikes.filter(id => id !== user.id);

      await pb.collection('arts').update(art.id, { 'likes': newLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
      // Revert optimistic update on error
      setIsLiked(!newIsLiked);
      setLikeCount(newIsLiked ? newLikeCount - 1 : newLikeCount + 1);
    }
  };

  const likeColor = isLiked ? currentTheme.primary : currentTheme.text;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
        <AntDesign 
          name={isLiked ? 'heart' : 'hearto'}
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
