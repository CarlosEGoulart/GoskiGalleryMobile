import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ColorValue,
  } from "react-native";
  import React from "react";
  
  type ButtonProps = {
    children: React.ReactNode;
    color?: ColorValue;
    onPress?: () => void;
  };
  
  export default function StyleButton({children, color = "#383838", onPress}: ButtonProps) {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 52,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
    },
  });
  
  