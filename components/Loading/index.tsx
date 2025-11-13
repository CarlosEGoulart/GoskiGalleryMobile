import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function Loading() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.background,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={currentTheme.primary} />
    </View>
  );
}
