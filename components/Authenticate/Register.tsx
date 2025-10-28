import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/config/firebaseConfig';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import StyleButton from '../StyleButton';
import theme from '@/constants/theme';
import { navigate } from 'expo-router/build/global-state/routing';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);

      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        createdAt: Timestamp.fromDate(new Date()),
      });

      navigate('/artsCatalog');
    } 
    
    catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={theme.colors.light}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor={theme.colors.light}
      />
      <StyleButton onPress={handleRegister}>Registrar</StyleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 20,
    backgroundColor: theme.backgroundColor
  },
  input: {
    color: theme.colors.light,
    borderWidth: 1,
    borderColor: theme.colors.light,
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
