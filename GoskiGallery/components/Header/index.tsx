import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '@/constants/theme'
import Logo from './Logo';
import MenuIcon from './MenuIcon';

export default function index() {
  return (
    <View style={styles.container}>
        <Logo />
        <MenuIcon />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignContent: "center",
      padding: theme.dimension.xs,
      justifyContent: "space-between",
      paddingHorizontal: theme.dimension.xs,
    },
});
