import { View, StyleSheet } from 'react-native'
import React from 'react'
import Typography from '../StyleText'

export default function Artists() {
  return (
    <View style={styles.container}>
      <Typography>Artists</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});