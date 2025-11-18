import { useTheme } from '@/context/ThemeContext';
import usePocketBaseAuth from '@/pocketbaseFiles/hooks/usePocketBaseAuth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import StyleButton from '../StyleButton';

export function Register() {
  const { registerUser } = usePocketBaseAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { currentTheme } = useTheme();

  const handleRegister = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await registerUser(email, password, confirmPassword, name, bio);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
      paddingHorizontal: 20,
      backgroundColor: currentTheme.background
    },
    input: {
      color: currentTheme.text, 
      borderWidth: 1,
      borderColor: currentTheme.subtleText,
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
        placeholderTextColor={currentTheme.subtleText}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={currentTheme.subtleText}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        onChangeText={setBio}
        value={bio}
        placeholderTextColor={currentTheme.subtleText}
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
        placeholderTextColor={currentTheme.subtleText}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
        placeholderTextColor={currentTheme.subtleText}
      />
      <StyleButton onPress={handleRegister}>Registrar</StyleButton>
    </View>
  );
}
