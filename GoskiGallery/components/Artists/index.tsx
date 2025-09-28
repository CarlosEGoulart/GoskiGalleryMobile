import { StyleSheet, ScrollView, FlatList, View } from 'react-native'
import React from 'react'
import Typography from '../StyleText'

export default function Arts() {
  

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Typography>Artist</Typography>
      </ScrollView>
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