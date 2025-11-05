// GoskiGallery/components/Header/index.tsx
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import useAuth from '@/firebase/hooks/useAuth';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function Header({ searchQuery, setSearchQuery }) {
  const [searchActive, setSearchActive] = useState(false);
  const { user, logout } = useAuth();
  const { currentTheme } = useTheme();

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (searchActive) {
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/Auth/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: currentTheme.dimension.sm,
      justifyContent: 'space-between',
      backgroundColor: currentTheme.background,
    },
    icons: {
      flexDirection: 'row',
      gap: 15,
      alignItems: 'center',
    },
    searchInput: {
      height: 40,
      borderColor: currentTheme.subtleText,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: currentTheme.dimension.sm,
      marginHorizontal: currentTheme.dimension.sm,
      marginBottom: currentTheme.dimension.sm,
      color: currentTheme.text,
      backgroundColor: currentTheme.card,
    },
  });

  return (
    <View style={{ backgroundColor: currentTheme.background }}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.icons}>
          <SearchIcon onPress={toggleSearch} searchActive={searchActive} color={currentTheme.text} />
          {user && (
            <>
              <Link href="/createArt" asChild>
                <Pressable>
                  <Ionicons name="add-circle-outline" size={34} color={currentTheme.text} />
                </Pressable>
              </Link>
              <Pressable onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={34} color={currentTheme.text} />
              </Pressable>
            </>
          )}
          <MenuIcon color={currentTheme.text} />
        </View>
      </View>
      {searchActive && (
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar artes..."
          placeholderTextColor={currentTheme.subtleText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
    </View>
  );
}
