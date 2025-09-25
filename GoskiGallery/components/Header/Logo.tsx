import { View, StyleSheet, Text } from 'react-native';
import React from 'react';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GoskiGallery</Text>
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
