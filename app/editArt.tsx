import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { usePocketBaseStore } from '@/pocketbase/stores/usePocketBaseStore';
import usePocketBaseDocument from '@/pocketbase/hooks/usePocketBaseDocument';
import StyleButton from '@/components/StyleButton';
import { useTheme } from '@/context/ThemeContext';

export default function EditArtPage() {
  const { id } = useLocalSearchParams();
  const { user, pocketBase: pb } = usePocketBaseStore();
  const { currentTheme } = useTheme();
  const { data: art, loading: artLoading, error: artError } = usePocketBaseDocument('arts', id as string);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (art) {
      if (user?.id !== art.artist) {
        Alert.alert('Access Denied', 'You do not have permission to edit this art.');
        router.back();
        return;
      }
      setTitle(art.title);
      setDescription(art.description);
    }
  }, [art, user]);

  useEffect(() => {
    if (artError) {
      Alert.alert('Error', 'Art not found.');
      router.back();
    }
  }, [artError]);

  const handleUpdate = async () => {
    if (!title || !description) {
      Alert.alert('Empty Fields', 'Please fill out all fields.');
      return;
    }

    setSaving(true);
    try {
      await pb.collection('arts').update(id as string, {
        title,
        description
      });
      Alert.alert('Success', 'Art updated successfully!');
      router.push('/artsCatalog');
    } catch (error) {
      console.error("Error updating art:", error);
      Alert.alert('Error', 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: currentTheme.background,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: currentTheme.background,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: currentTheme.text,
        marginBottom: 10,
    },
    input: {
        backgroundColor: currentTheme.card,
        color: currentTheme.text,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: currentTheme.subtleText
    },
    });

  if (artLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title of the Work"
        placeholderTextColor={currentTheme.subtleText}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description of the work..."
        placeholderTextColor={currentTheme.subtleText}
        multiline
      />

      {saving ? 
        <ActivityIndicator size="large" color={currentTheme.primary} /> :
        <StyleButton onPress={handleUpdate} disabled={saving}>Save</StyleButton>
      }
    </View>
  );
}
