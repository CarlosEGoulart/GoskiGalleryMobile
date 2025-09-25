import { View, StyleSheet } from 'react-native';
import React from 'react';
import Typography from './StyleText';
import StyleButton from './StyleButton';


export default function Main() {
  return (
    <View style={styles.container}>
      <Typography>Goski Gallery, um espaço para divulgar e exibir suas obras.</Typography>
      <StyleButton>Ver mais</StyleButton>
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
