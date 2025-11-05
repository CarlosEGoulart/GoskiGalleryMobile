import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import React from "react";
import "@expo/react-native-action-sheet"
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...AntDesign.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <ActionSheetProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
