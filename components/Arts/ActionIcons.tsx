import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import useAuth from '@/firebase/hooks/useAuth';
import { db } from '@/firebase/config/firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import theme from '@/constants/theme';

// A interface da arte recebida como propriedade
interface Art {
  id: string;
  title: string;
  likes?: string[];
}

export default function ActionIcons({ art }: { art: Art }) {
  const { user } = useAuth(); // Pega o usuário logado
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(art.likes?.length || 0);

  // Efeito para verificar o estado do like em tempo real
  useEffect(() => {
    if (!user?.uid || !art.id) return;

    const artRef = doc(db, 'arts', art.id);
    // onSnapshot ouve mudanças no documento em tempo real
    const unsubscribe = onSnapshot(artRef, (doc) => {
      const data = doc.data();
      const likes = data?.likes || [];
      setLikeCount(likes.length);
      setIsLiked(likes.includes(user.uid));
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, [art.id, user?.uid]);

  const handleLike = async () => {
    if (!user?.uid) {
      console.log('Usuário não logado, não pode curtir.');
      return;
    }

    const artRef = doc(db, 'arts', art.id);

    // A lógica agora é baseada no estado do `isLiked`
    if (isLiked) {
      // Se já está curtido, remove o like (descurtir)
      await updateDoc(artRef, {
        likes: arrayRemove(user.uid)
      });
    } else {
      // Se não está curtido, adiciona o like (curtir)
      await updateDoc(artRef, {
        likes: arrayUnion(user.uid)
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
        <AntDesign 
          name={isLiked ? 'heart' : 'hearto'} // Ícone de coração preenchido ou vazio
          size={24} 
          color={isLiked ? theme.colors.primary : 'white'} // Cor vermelha se curtido, branco se não
        />
        <Text style={[styles.likeCountText, { color: isLiked ? theme.colors.primary : 'white' }]}>
          {likeCount}
        </Text>
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
      marginLeft: 5,
      fontSize: 16,
      fontWeight: 'bold',
    }
});
