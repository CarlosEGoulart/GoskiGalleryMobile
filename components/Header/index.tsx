// GoskiGallery/components/Header/index.tsx
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import theme from '@/constants/theme';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import useAuth from '@/firebase/hooks/useAuth';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ searchQuery, setSearchQuery }) {
  const [searchActive, setSearchActive] = useState(false);
  const { user, logout } = useAuth();

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

  return (
    <View>
      <View style={styles.container}>
        <Logo />
        <View style={styles.icons}>
          <SearchIcon onPress={toggleSearch} searchActive={searchActive} />
          {user && (
            <>
              <Link href="/createArt" asChild>
                <Pressable>
                  <Ionicons name="add-circle-outline" size={34} color={theme.colors.light} />
                </Pressable>
              </Link>
              <Pressable onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={34} color={theme.colors.light} />
              </Pressable>
            </>
          )}
          <MenuIcon />
        </View>
      </View>
      {searchActive && (
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar artes..."
          placeholderTextColor={'grey'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.dimension.xs,
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: theme.colors.dark,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: theme.dimension.xs,
    marginHorizontal: theme.dimension.xs,
    marginBottom: theme.dimension.xs,
    color: 'white',
  },
});
