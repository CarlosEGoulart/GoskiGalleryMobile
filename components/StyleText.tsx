import { View, Text, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext';

type StyleTextProps = {
    children: React.ReactNode;
    // A prop 'color' foi removida para garantir consistência com o tema
}

export default function StyleText({ children }: StyleTextProps) {
  const { currentTheme } = useTheme();

  const style: StyleProp<TextStyle> = {
    // A cor agora vem diretamente do objeto do tema atual
    color: currentTheme.text,
    fontWeight: "bold",
    padding: 5,
    fontSize: 20,
  };
   
    return (
    <View>
      <Text style={style}>{children}</Text>
    </View>
  )
}