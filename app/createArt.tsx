import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { usePocketBaseStore } from '@/pocketbase/stores/usePocketBaseStore';
import StyleButton from '@/components/StyleButton';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

export default function CreateArtPage() {
  const { user, pocketBase: pb } = usePocketBaseStore();
  const { currentTheme } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCreateArt = async () => {
    if (!title || !description || !imageUri) {
      setError('Please fill out all fields and select an image.');
      return;
    }

    if (!user) {
      setError('You must be logged in to create art.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('artist', user.id);
      formData.append('artistName', user.name);

      // Correctly format the image for multipart/form-data
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename!);
      const type = match ? `image/${match[1]}` : `image`;
      formData.append('image', { uri: imageUri, name: filename, type } as any);

      await pb.collection('arts').create(formData);

      setLoading(false);
      router.push('/artsCatalog');
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      console.error("Error creating art:", JSON.stringify(err));
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
      color: currentTheme.text,
    },
    input: {
      borderWidth: 1,
      borderColor: currentTheme.subtleText,
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      color: currentTheme.text,
      width: '100%',
      backgroundColor: currentTheme.card,
    },
    descriptionInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    errorText: {
      color: currentTheme.error,
      textAlign: 'center',
      marginBottom: 10,
    },
    imagePicker: {
      backgroundColor: currentTheme.primary,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 15,
      width: '100%',
    },
    imagePickerText: {
      color: currentTheme.background,
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
          <Text style={styles.title}>Add New Art</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Title of the Art"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={currentTheme.subtleText}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor={currentTheme.subtleText}
          />
          
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Select Image</Text>
          </TouchableOpacity>

          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

          {loading ? (
            <ActivityIndicator size="large" color={currentTheme.primary} />
          ) : (
            <StyleButton onPress={handleCreateArt}>Create Art</StyleButton>
          )}
        </View>
    </ScrollView>
  );
}
