import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import theme from "@/constants/theme";

export default function Actions() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="menu" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.dimension.sm,
  },
});