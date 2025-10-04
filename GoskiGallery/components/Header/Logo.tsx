import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Link href={'/'}>
        <Text style={styles.text}>GoskiGallery</Text>
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

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
