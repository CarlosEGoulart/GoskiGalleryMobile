import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import theme from "@/constants/theme";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function Actions() {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleMenuPress = () => {
    const options = ["Perfil", "Configurações", "Sair", "Cancelar"];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress}>
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