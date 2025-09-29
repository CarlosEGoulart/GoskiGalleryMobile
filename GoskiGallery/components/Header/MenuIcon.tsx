import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import theme from "@/constants/theme";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useRouter } from 'expo-router';

export default function Actions() {
  const { showActionSheetWithOptions } = useActionSheet();

  const router = useRouter();

  const handleMenuPress = () => {
    const options = ['Home', 'Artes', 'Artistas', 'Cancelar'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Menu",
        containerStyle: {
          backgroundColor: '#383838',
          borderRadius: 10,
        },
        textStyle: {
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
        },
        titleTextStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        cancelButtonTintColor: 'red',
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
