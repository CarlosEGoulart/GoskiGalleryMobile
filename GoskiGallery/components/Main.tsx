import { View, StyleSheet } from 'react-native'
import React from 'react'
import Typography from './StyleText';
import StyleButton from './StyleButton';
import { Link } from 'expo-router';

export default function Main() {


  return (
    <View style={styles.container}>
      <Typography>Goski Gallery.</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      fontWeight: 'bold'
    },
});