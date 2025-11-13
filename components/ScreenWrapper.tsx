import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ScreenWrapper({ children }) {
  const { currentTheme, theme } = useTheme(); 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </View>
  );
}
