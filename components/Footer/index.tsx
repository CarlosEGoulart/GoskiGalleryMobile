import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import IconButton from './IconButton';
import { Link } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: currentTheme.dimension.sm,
      paddingHorizontal: currentTheme.dimension.sm,
      backgroundColor: currentTheme.background,
    },
  });

  return (
    <View style={styles.container}>
      <Link href={'/'} asChild>
        <TouchableOpacity>
          <IconButton text="" icon="home" color={currentTheme.text} />
        </TouchableOpacity>
      </Link>

      <Link href={'/artsCatalog'} asChild>
        <TouchableOpacity>
          <IconButton text="" icon="picture" color={currentTheme.text} />
        </TouchableOpacity>
      </Link>
      
      <Link href={'/artists'} asChild>
        <TouchableOpacity>
          <IconButton text="" icon="user" color={currentTheme.text} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
