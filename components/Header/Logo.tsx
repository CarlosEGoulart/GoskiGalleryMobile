import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import StyleText from '../StyleText';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Link href={'/'}>
        <StyleText>GoskiGallery</StyleText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
});
