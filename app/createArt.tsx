import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { db } from '@/firebase/config/firebaseConfig';
import useAuth from '@/firebase/hooks/useAuth';
import StyleButton from '@/components/StyleButton';
import StyleText from '@/components/StyleText';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

export default function CreateArtPage() {
  const { user } = useAuth();
  const { currentTheme } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão da galeria para isso funcionar!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setImageUri(result.assets[0].uri);
      const dataUrl = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImageBase64(dataUrl);
    }
  };

  const handleCreateArt = async () => {
    if (!title || !description || !imageBase64) {
      setError('Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }

    if (!user) {
      setError('Você precisa estar logado para criar uma arte.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const artistDocRef = doc(db, 'artists', user.uid);
      const artistDoc = await getDoc(artistDocRef);

      if (!artistDoc.exists()) {
        throw new Error("Artista não encontrado.");
      }

      const artistName = artistDoc.data().name;

      const artDocRef = await addDoc(collection(db, 'arts'), {
        title,
        description,
        image: imageBase64,
        artistId: user.uid,
        artistName: artistName,
        createdAt: serverTimestamp(),
      });

      await updateDoc(artistDocRef, {
        arts: arrayUnion({
          id: artDocRef.id,
          title,
          image: imageBase64,
        })
      });

      setLoading(false);
      router.push('/artsCatalog');
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      console.error(err);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: currentTheme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: currentTheme.text, // Cor de texto dinâmica
    },
    input: {
      borderWidth: 1,
      borderColor: currentTheme.subtleText, // Borda dinâmica
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      color: currentTheme.text, // Cor do texto do input
      width: '100%',
      backgroundColor: currentTheme.card, // Fundo do input
    },
    descriptionInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    errorText: {
      color: currentTheme.error, // Cor de erro dinâmica
      textAlign: 'center',
      marginBottom: 10,
    },
    imagePicker: {
      backgroundColor: currentTheme.primary, // Fundo do botão
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 15,
      width: '100%',
    },
    imagePickerText: {
      color: currentTheme.background, // Cor do texto do botão
      fontWeight: 'bold',
    },
    previewImage: {
      width: '100%',
      height: 200,
      borderRadius: 5,
      marginBottom: 15,
    },
  });

  return (
    <ScrollView style={{backgroundColor: currentTheme.background}}>
        <View style={styles.container}>
          <Text style={styles.title}>Adicionar Nova Arte</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Título da Arte"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={currentTheme.subtleText} // Placeholder dinâmico
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor={currentTheme.subtleText} // Placeholder dinâmico
          />
          
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
          </TouchableOpacity>

          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

          {loading ? (
            <ActivityIndicator size="large" color={currentTheme.primary} />
          ) : (
            <StyleButton onPress={handleCreateArt}>Criar Arte</StyleButton>
          )}
        </View>
    </ScrollView>
  );
}
