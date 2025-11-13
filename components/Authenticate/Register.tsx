import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/config/firebaseConfig';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import StyleButton from '../StyleButton';
import { useTheme } from '@/context/ThemeContext'; // Importa o hook do tema

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { currentTheme } = useTheme(); // Usa o hook do tema

  const handleRegister = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const artistDocRef = doc(db, 'artists', user.uid);

      await setDoc(artistDocRef, {
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: Timestamp.fromDate(new Date()),
        bio: bio,
        image: ''
      });
      
      // A tela RegisterPage cuidará do redirecionamento
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Estilos dinâmicos baseados no tema
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
      paddingHorizontal: 20,
      backgroundColor: currentTheme.background // Fundo dinâmico
    },
    input: {
      color: currentTheme.text, // Cor de texto dinâmica
      borderWidth: 1,
      borderColor: currentTheme.subtleText, // Cor da borda dinâmica
      borderRadius: 5,
      padding: 10,
      width: '100%',
    },
    bioInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setName}
        value={name}
        placeholderTextColor={currentTheme.subtleText} // Cor do placeholder dinâmica
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={currentTheme.subtleText} // Cor do placeholder dinâmica
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        onChangeText={setBio}
        value={bio}
        placeholderTextColor={currentTheme.subtleText} // Cor do placeholder dinâmica
        autoCapitalize="sentences"
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor={currentTheme.subtleText} // Cor do placeholder dinâmica
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
        placeholderTextColor={currentTheme.subtleText} // Cor do placeholder dinâmica
      />
      <StyleButton onPress={handleRegister}>Registrar</StyleButton>
    </View>
  );
}
