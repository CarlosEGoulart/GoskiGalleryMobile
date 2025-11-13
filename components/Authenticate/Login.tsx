import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config/firebaseConfig';
import StyleButton from '../StyleButton';
import { useTheme } from '@/context/ThemeContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { currentTheme } = useTheme();

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } 
    catch (err: any) {
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
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={currentTheme.subtleText}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor={currentTheme.subtleText}
      />
      <StyleButton onPress={handleLogin}>Login</StyleButton>
    </View>
  );
}
