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
      shadowColor: "rgb(0, 0, 0)",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
  
      paddingVertical: 12,
      paddingHorizontal: 32,
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
  
  