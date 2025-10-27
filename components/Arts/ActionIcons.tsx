import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ActionIcons() {
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(10);

  useEffect(() => {
    if (isLiked) {
      console.log('Post foi curtido!');
    } 
    else {
      console.log('Post foi descurtido.');
    }
  }, [isLiked]);

  const handleLike = () => {
    setIsLiked(currentIsLiked => !currentIsLiked);
    setLikeCount(currentCount => isLiked ? currentCount - 1 : currentCount + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
        <AntDesign 
          name='like'
          size={24} 
          color={isLiked ? "grey" : "white"} 
        />
        <Text style={styles.likeCountText}>{likeCount}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    likeCountText: {
      color: 'white',
      marginLeft: 5,
      fontSize: 16,
    }
});
