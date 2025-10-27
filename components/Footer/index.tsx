import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import IconButton from './IconButton';
import { Link } from 'expo-router';
import theme from '@/constants/theme';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Link href={'/'}>
        <TouchableOpacity>
          <IconButton text="" icon="home" />
        </TouchableOpacity>
      </Link>

      <Link href={'/artsCatalog'}>
        <TouchableOpacity>
          <IconButton text="" icon="picture" />
        </TouchableOpacity>
      </Link>
      
      <Link href={'/artists'}>
        <TouchableOpacity>
          <IconButton text="" icon="user" />
        </TouchableOpacity>
      </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.dimension.xs,
    paddingHorizontal: theme.dimension.xs,
  },
});
