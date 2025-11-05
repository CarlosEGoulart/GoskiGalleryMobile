import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import StyleButton from './StyleButton';
import StyleText from './StyleText';
import { Link } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function Main() {
  const { currentTheme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StyleText>Goski Gallery</StyleText>
      <StyleText>Divulgue suas obras</StyleText>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Link href="/Auth/register" asChild>
          <StyleButton>Registre-se</StyleButton>
        </Link>
        <Link href="/Auth/login" asChild>
          <StyleButton>Login</StyleButton>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
