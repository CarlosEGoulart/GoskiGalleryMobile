import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Text } from 'react-native';
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { db } from '@/firebase/config/firebaseConfig';
import useAuth from '@/firebase/hooks/useAuth';
import StyleButton from '@/components/StyleButton';
import StyleText from '@/components/StyleText';
import theme from '@/constants/theme';
import { router } from 'expo-router';

export default function CreateArtPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null); // For preview
  const [imageBase64, setImageBase64] = useState<string | null>(null); // For saving
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
      quality: 0.5, // Lower quality to reduce base64 string size
      base64: true, // Ask for the base64 representation
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setImageUri(result.assets[0].uri);
      // Create a data URL to be used in Image source and stored in DB
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
        image: imageBase64, // Save the base64 string
        artistId: user.uid,
        artistName: artistName,
        createdAt: serverTimestamp(),
      });

      await updateDoc(artistDocRef, {
        arts: arrayUnion({
          id: artDocRef.id,
          title,
          image: imageBase64, // Save the base64 string here as well
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

  return (
    <View style={styles.container}>
      <StyleText style={styles.title}>Adicionar Nova Arte</StyleText>
      {error && <StyleText style={styles.errorText}>{error}</StyleText>}
      <TextInput
        style={styles.input}
        placeholder="Título da Arte"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="grey"
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        placeholderTextColor="grey"
      />
      
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.light} />
      ) : (
        <StyleButton onPress={handleCreateArt}>Criar Arte</StyleButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'white',
    width: '100%',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  imagePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
});
