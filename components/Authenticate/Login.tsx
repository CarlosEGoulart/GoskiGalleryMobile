import { useTheme } from '@/context/ThemeContext';
import usePocketBaseAuth from '@/pocketbaseFiles/hooks/usePocketBaseAuth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import StyleButton from '../StyleButton';

export function Login() {
  const { login } = usePocketBaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { currentTheme } = useTheme();

  const handleLogin = async () => {
    setError(null);
    try {
      await login(email, password);
      // On successful login, the useEffect in LoginPage will handle the redirect.
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
