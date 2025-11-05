import {
    TouchableOpacity,
    Text,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import { useTheme } from "@/context/ThemeContext";

  type ButtonProps = {
    children: React.ReactNode;
    onPress?: () => void;
  };

  export default function StyleButton({children, onPress}: ButtonProps) {
    const { currentTheme } = useTheme();

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentTheme.primary }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: currentTheme.background }]}>{children}</Text>
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
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
    },
  });
