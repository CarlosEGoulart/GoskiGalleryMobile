import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config/firebaseConfig';
import useAuth from '../firebase/hooks/useAuth';
import StyleButton from '@/components/StyleButton';

export default function EditArtPage() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id || !user) return;

    const fetchArt = async () => {
      try {
        const artRef = doc(db, 'arts', id as string);
        const docSnap = await getDoc(artRef);

        if (docSnap.exists()) {
          const artData = docSnap.data();
          if (artData.artistId !== user.uid) {
            Alert.alert('Acesso Negado', 'Você não tem permissão para editar esta arte.');
            router.back();
            return;
          }
          setTitle(artData.title);
          setImage(artData.image);
          setDescription(artData.description);
        } else {
          Alert.alert('Erro', 'Arte não encontrada.');
          router.back();
        }
      } catch (error) {
        console.error("Erro ao buscar arte:", error);
        Alert.alert('Erro', 'Não foi possível carregar os dados da arte.');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, [id, user]);

  const handleUpdate = async () => {
    if (!title || !image || !description) {
      Alert.alert('Campos Vazios', 'Por favor, preencha todos os campos.');
      return;
    }

    setSaving(true);
    try {
      const artRef = doc(db, 'arts', id as string);
      await updateDoc(artRef, {
        title,
        image,
        description
      });
      Alert.alert('Sucesso', 'Arte atualizada com sucesso!');
      router.push('/artsCatalog');
    } 
    
    catch (error) {
      console.error("Erro ao atualizar arte:", error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } 
    
    finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título da Obra"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="https://exemplo.com/imagem.png"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição da obra..."
        placeholderTextColor="#888"
        multiline
      />

      <StyleButton onPress={handleUpdate}>Salvar</StyleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#161616',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#242424',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444'
  },
});
