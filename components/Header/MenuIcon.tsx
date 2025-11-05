import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useRouter } from 'expo-router';
import { useTheme } from "@/context/ThemeContext";

export default function MenuIcon({ color }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();
  const { toggleTheme, theme: currentThemeMode, currentTheme } = useTheme(); 

  const handleMenuPress = () => {
    const options = ['Home', 'Artes', 'Artistas', `Mudar para tema ${currentThemeMode === 'dark' ? 'claro' : 'escuro'}`, 'Cancelar'];
    const cancelButtonIndex = 4;
    const destructiveButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: "Menu",
        containerStyle: {
          backgroundColor: currentTheme.card,
          borderRadius: 10,
        },
        textStyle: {
          color: currentTheme.text,
          fontSize: 18,
          textAlign: 'center',
        },
        titleTextStyle: {
          color: currentTheme.text,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        destructiveColor: currentTheme.error,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            router.push('/');
            break;
          case 1:
            router.push('/artsCatalog');
            break;
          case 2:
            router.push('/artists');
            break;
          case 3:
            toggleTheme();
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress}>
        <AntDesign name="menu" size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
