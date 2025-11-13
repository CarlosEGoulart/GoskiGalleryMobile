import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import ActionIcons from './ActionIcons';
import { useTheme } from '@/context/ThemeContext'; // Importa o hook do tema

export default function Art({ art }) {
  const { currentTheme } = useTheme(); // Usa o hook do tema

  if (!art) {
    return null;
  }

  // Estilos dinâmicos baseados no tema
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      backgroundColor: currentTheme.background, // Fundo dinâmico
    },
    artImage: {
      width: '100%',
      height: 400,
      resizeMode: 'cover',
    },
    artInfo: {
      padding: 15,
    },
    artTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: currentTheme.text, // Cor de texto dinâmica
    },
    artDescription: {
      fontSize: 16,
      marginTop: 5,
      color: currentTheme.text, // Cor de texto dinâmica
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: art.imageUrl }} style={styles.artImage} />
      
      <View style={styles.artInfo}>
        <Text style={styles.artTitle}>{art.title}</Text>
        <Text style={styles.artDescription}>{art.description}</Text>
        {/* ActionIcons já está tematizado */}
        <ActionIcons art={art} />
      </View>
    </View>
  );
}
