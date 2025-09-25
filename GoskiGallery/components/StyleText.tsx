import { View, Text, TextStyle, ColorValue, StyleProp } from 'react-native'
import React from 'react'

type StyleTextProps = {
    children: React.ReactNode;
    color?: ColorValue;
}

export default function StyleText({ children }: StyleTextProps) {
  const style: StyleProp<TextStyle> = {
    color: "white",
  };
   
  
    return (
    <View>
      <Text style={style}>{children}</Text>
    </View>
  )
}